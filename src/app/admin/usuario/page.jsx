"use client";
import AdminHeader from "@/components/AdminHeader";
import CardUsuario from "@/components/CardUsuario";
import ModalUsuario from "@/components/ModalUsuario";
import { UsuarioConxtex } from "@/context/UsuarioContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function AdminPageUsuario() {
    const [usuarioList, setUsuarioList] = useState([]);
    const {
        initialUserForm,
        handlerAddUser,
        visibleModal,
        handlerCloseModal,
        handlerOpenModal,
    } = useContext(UsuarioConxtex);

    const getUsuarios = async () => {
        const response = await axios.get("http://localhost:8080/usuario");
        setUsuarioList(response.data);
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    return (
        <>
            <main className="min-h-screen flex flex-col justify-items-center bg-white">
                <AdminHeader />
                <h1 className="flex text-5xl text-black justify-center mt-7 font-mono">
                    Usuarios
                </h1>

                <div className="flex justify-end m-3">
                    <button
                        onClick={() => handlerOpenModal()}
                        className="btn bg-gray-900 hover:bg-gray-600 transform hover:scale-110 transition-transform duration-200"
                    >
                        <span className="text-white">Agregar Usuario</span>
                    </button>
                </div>

                {
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center">
                        {usuarioList.map((usuario, index) => (
                            <CardUsuario key={index} usuario={usuario} />
                        ))}
                    </div>
                }
                {
                    <ModalUsuario
                        isOpen={visibleModal}
                        onClose={handlerCloseModal}
                        handlerAddUser={handlerAddUser}
                        initialUserForm={initialUserForm}
                    />
                }
            </main>
        </>
    );
}
