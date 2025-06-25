"use client";
import axios from "axios";
import AdminHeader from "@/components/AdminHeader";
import ModalEstado from "@/components/ModalEstado";
import CardBocadito from "@/components/CardBocadito";
import ModalBocadito from "@/components/ModalBocadito";
import { useContext, useEffect, useState } from "react";
import { BocaditoContext } from "@/context/BocaditoContext";

export default function AdminPageBocadito() {

    const [bocaditoList, setBocaditoList] = useState([]);
    const [modalType, setModalType] = useState("");
    const { initialBocaditoForm, handlerAddBocadito, handlerUpdateBocadito } = useContext(BocaditoContext);
    const [selectedBocadito, setSelectedBocadito] = useState(initialBocaditoForm);

    const getBocaditos = async () => {
        const response = await axios.get("http://localhost:8080/bocaditos");
        setBocaditoList(response.data);
    };

    useEffect(() => {
        getBocaditos();
    }, [handlerAddBocadito]);

    return (
        <>
            <main className="min-h-screen flex flex-col justify-items-center bg-white">
                <AdminHeader />
                <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                    Bocaditos
                </h1>

                <div className="flex justify-end m-3">
                    <button
                        onClick={() => {
                            setSelectedBocadito(initialBocaditoForm);
                            setModalType("add");
                        }}
                        className="btn bg-gray-900 hover:bg-gray-600 transform hover:scale-110 transition-transform duration-200"
                    >
                        <span className="text-white">Agregar Bocadito</span>
                    </button>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center">
                    {bocaditoList.map((bocadito, index) => (
                        <CardBocadito
                            key={index}
                            bocadito={bocadito}
                            onEdit={() => {
                                setSelectedBocadito(bocadito);
                                setModalType("edit");
                            }}
                            onEditState={() => {
                                setSelectedBocadito(bocadito);
                                setModalType("estado");
                            }}
                        />
                    ))}
                </div>

                {(modalType === "add" || modalType === "edit") && (
                    <ModalBocadito
                        isOpen={true}
                        onClose={() => setModalType("")}
                        handlerAddBocadito={handlerAddBocadito}
                        handlerUpdateBocadito={handlerUpdateBocadito}
                        initialBocaditoForm={selectedBocadito}
                        isEdit={modalType === "edit"}
                    />
                )}
                {modalType === "estado" && (
                    <ModalEstado
                        isOpen={true}
                        onClose={() => setModalType("")}
                        initialForm={selectedBocadito}
                    />
                )}
            </main>
        </>
    );
}
