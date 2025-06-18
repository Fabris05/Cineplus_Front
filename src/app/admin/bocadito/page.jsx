"use client";
import AdminHeader from "@/components/AdminHeader";
import CardBocadito from "@/components/CardBocadito";
import ModalBocadito from "@/components/ModalBocadito";
import { BocaditoContext } from "@/context/BocaditoContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function AdminPageBocadito() {
    const[bocaditoList, setBocaditoList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { initialBocaditoForm, handlerAddBocadito } =
        useContext(BocaditoContext);

    const getBocaditos = async () => {
        const response = await axios.get("http://localhost:8080/bocaditos");
        setBocaditoList(response.data);
    }

    useEffect( () => {
        getBocaditos();
    }, [])

    return (
        <>
            <main className="min-h-screen flex flex-col justify-items-center bg-white">
                <AdminHeader />
                <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                    Bocaditos
                </h1>

                <div className="flex justify-end m-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn bg-gray-900 hover:bg-gray-600 transform hover:scale-110 transition-transform duration-200"
                    >
                        <span className="text-white">Agregar Bocadito</span>
                    </button>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center">
                    {bocaditoList.map((bocadito, index) => (
                        <CardBocadito key={index} bocadito={bocadito} />
                    ))}
                </div>

                <ModalBocadito
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    handlerAddBocadito={handlerAddBocadito}
                    initialBocaditoForm={initialBocaditoForm}
                />
            </main>
        </>
    );
}
