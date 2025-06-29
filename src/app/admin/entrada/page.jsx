"use client";
import axios from "axios";
import AdminHeader from "@/components/AdminHeader";
import ModalEstado from "@/components/ModalEstado";
import CardEntrada from "@/components/CardEntrada";
import ModalEntrada from "@/components/ModalEntrada";
import { useContext, useEffect, useState } from "react";
import { EntradaContext } from "@/context/EntradaContext";

export default function AdminPageEntrada() {
    const { initialEntradaForm, handlerAddEntrada, handlerUpdateEntrada } =
        useContext(EntradaContext);

    const [entradaList, setEntradaList] = useState([]);
    const [modalType, setModalType] = useState("");
    const [selectedEntrada, setSelectedEntrada] = useState(initialEntradaForm);

    const getEntradas = async () => {
        const response = await axios.get("http://localhost:8080/tipoentrada");
        setEntradaList(response.data);
    };

    useEffect(() => {
        getEntradas();
    }, [handlerAddEntrada]);

    return (
        <>
            <main className="min-h-screen flex flex-col justify-items-center bg-white">
                <AdminHeader />
                <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                    Entradas
                </h1>

                <div className="flex justify-end m-3">
                    <button
                        onClick={() => {
                            setSelectedEntrada(initialEntradaForm);
                            setModalType("add");
                        }}
                        className="btn bg-gray-900 hover:bg-gray-600 transform hover:scale-110 transition-transform duration-200"
                    >
                        <span className="text-white">Agregar Entrada</span>
                    </button>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center">
                    {entradaList.map((entrada, index) => (
                        <CardEntrada
                            key={index}
                            entrada={entrada}
                            onEdit={() => {
                                setSelectedEntrada(entrada);
                                setModalType("edit");
                            }}
                            onEditState={() => {
                                setSelectedEntrada(entrada);
                                setModalType("estado");
                            }}
                        />
                    ))}
                </div>
                {(modalType === "add" || modalType === "edit") && (
                    <ModalEntrada
                        isOpen={true}
                        onClose={() => setModalType("")}
                        handlerAddEntrada={handlerAddEntrada}
                        handlerUpdateEntrada={handlerUpdateEntrada}
                        initialEntradaForm={selectedEntrada}
                        isEdit={modalType === "edit"}
                    />
                )}
                {modalType === "estado" && (
                    <ModalEstado
                        isOpen={true}
                        onClose={() => setModalType("")}
                        initialForm={selectedEntrada}
                    />
                )}
            </main>
        </>
    );
}
