"use client";

import { useEntrada } from "@/hooks/useEntrada";
import { EntradaContext } from "./EntradaContext";

export const EntradaProvider = ({ children }) => {
    const {
        entradas,
        entradaSelected,
        initialEntradaForm,
        visibleModal,
        handlerAddEntrada,
        handlerCloseModal,
    } = useEntrada();

    return (
        <EntradaContext.Provider
            value={{
                entradas,
                entradaSelected,
                initialEntradaForm,
                visibleModal,
                handlerAddEntrada,
                handlerCloseModal,
            }}
        >
            {children}
        </EntradaContext.Provider>
    );
};
