"use client";

import { useBocadito } from "@/hooks/useBocadito";
import { BocaditoContext } from "./BocaditoContext";

export const BocaditoProvider = ({ children }) => {
    const {
        bocaditos,
        bocaditoSelected,
        initialBocaditoForm,
        visibleModal,
        handlerAddBocadito,
        handlerCloseModal,
        handlerUpdateBocadito
    } = useBocadito();

    return (
        <BocaditoContext.Provider
            value={{
                bocaditos,
                bocaditoSelected,
                initialBocaditoForm,
                visibleModal,
                handlerAddBocadito,
                handlerCloseModal,
                handlerUpdateBocadito
            }}
        >
            {children}
        </BocaditoContext.Provider>
    );
};
