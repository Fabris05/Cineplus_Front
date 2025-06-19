"use client";
import AdminHeader from "@/components/AdminHeader";
import CardSocio from "@/components/CardSocio";
import ModalSocio from "@/components/ModalSocio";
import { SocioContext } from "@/context/SocioContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function AdmingPageSocio() {
    const [socioList, setSocioList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { initialSocioForm, handlerAddSocio } = useContext(SocioContext);

    const getSocios = async () => {
        const response = await axios.get("http://localhost:8080/socio");
        setSocioList(response.data);
    };

    useEffect(() => {
        getSocios();
    }, []);

    return (
        <>
            <main className="min-h-screen flex flex-col justify-items-center bg-white">
                <AdminHeader />
                <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                    Socios
                </h1>

                <div className="flex justify-end m-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn bg-gray-900 hover:bg-gray-600 transform hover:scale-110 transition-transform duration-200"
                    >
                        <span className="text-white">Agregar Socio</span>
                    </button>
                </div>

                {
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center">
                        {socioList.map((socio, index) => (
                            <CardSocio key={index} socio={socio} />
                        ))}
                    </div>
                }

                {
                    <ModalSocio
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        handlerAddSocio={handlerAddSocio}
                        initialSocioForm={initialSocioForm}
                    />
                }
            </main>
        </>
    );
}
