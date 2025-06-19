"use client";

import { useSocio } from "@/hooks/useSocio";
import { SocioContext } from "./SocioContext";

export const SocioProvider = ({ children }) => {
    const {
        socios,
        socioSelected,
        initialSocioForm,
        visibleModal,
        handlerAddSocio,
        handlerCloseModal,
    } = useSocio();

    return (
        <SocioContext.Provider
            value={{
                socios,
                socioSelected,
                initialSocioForm,
                visibleModal,
                handlerAddSocio,
                handlerCloseModal,
            }}
        >
            {children}
        </SocioContext.Provider>
    );
};
