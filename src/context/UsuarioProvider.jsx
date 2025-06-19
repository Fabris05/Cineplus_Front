"use client";

import { UseUsuario } from "@/hooks/useUsuario";
import { UsuarioConxtex } from "./UsuarioContext";

export const UsuarioProvider = ({ children }) => {
    const {
        usuarios,
        usuarioSelected,
        initialUserForm,
        visibleModal,
        handlerAddUser,
        handlerCloseModal,
        handlerOpenModal,
    } = UseUsuario();

    return (
        <UsuarioConxtex.Provider
            value={{
                usuarios,
                usuarioSelected,
                initialUserForm,
                visibleModal,
                handlerAddUser,
                handlerCloseModal,
                handlerOpenModal,
            }}
        >
            {children}
        </UsuarioConxtex.Provider>
    );
};
