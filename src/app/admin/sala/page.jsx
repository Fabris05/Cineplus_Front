"use client";
import AdminHeader from "@/components/AdminHeader";
import CardSala from "@/components/CardSala";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPageSala() {

    const[salaList, setSalaList] = useState([]);

    const getSalas = async () =>{
        const response = await axios.get("http://localhost:8080/salas");
        setSalaList(response.data);
    }

    useEffect( () => {
        getSalas();
    }, [])

    return (
        <>
            <main className="min-h-screen flex flex-col justify-items-center bg-white">
                <AdminHeader/>
                <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                    Salas
                </h1>

                <div className="flex justify-end m-3">
                    {/* <button
                        onClick={() => setShowModal(true)}
                        className="btn bg-gray-900 hover:bg-gray-600 transform hover:scale-110 transition-transform duration-200"
                    >
                        <span className="text-white">Agregar Entrada</span>
                    </button> */}
                </div>

                {<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center">
                    {salaList.map((sala, index) => (
                        <CardSala key={index} sala={sala} />
                    ))}
                </div>}

                {/* {
                    <ModalEntrada
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        handlerAddEntrada={handlerAddEntrada}
                        initialEntradaForm={initialEntradaForm}
                    />
                } */}
            </main>
        </>
    );
}
