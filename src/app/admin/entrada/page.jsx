"use client";
import AdminHeader from "@/components/AdminHeader";
import CardEntrada from "@/components/CardEntrada";
import ModalEntrada from "@/components/ModalEntrada";
import { EntradaContext } from "@/context/EntradaContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function AdminPageEntrada() {

    const[entradaList, setEntradaList] = useState([]);
    const[showModal, setShowModal] = useState(false);
    const{initialEntradaForm, handlerAddEntrada} = useContext(EntradaContext);

    const getEntradas = async () => {
        const response = await axios.get("http://localhost:8080/tipoentrada");
        setEntradaList(response.data);
    }

    useEffect( () => {
        getEntradas();
    },[])

    return (
        <>
            <main className="min-h-screen flex flex-col justify-items-center bg-white">
                <AdminHeader />
                <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                    Entradas
                </h1>

                <div className="flex justify-end m-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn bg-gray-900 hover:bg-gray-600 transform hover:scale-110 transition-transform duration-200"
                    >
                        <span className="text-white">Agregar Entrada</span>
                    </button>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center">
                    {entradaList.map((entrada, index) => (
                        <CardEntrada key={index} entrada={entrada} />
                    ))}
                </div>

                {<ModalEntrada
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    handlerAddEntrada={handlerAddEntrada}
                    initialEntradaForm={initialEntradaForm}
                />}
            </main>
        </>
    );
}
