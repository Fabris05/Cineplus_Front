import { useState } from "react";

export const useButacas = (initialButacas = []) => {
    const [butacas, setButacas] = useState(initialButacas);
    const [selectedButacas, setSelectedButacas] = useState([]);

    const toggleButaca = (butaca) => {
        const id = butaca.idButacaSala;

        setButacas((prevButacas) =>
            prevButacas.map((b) =>
                b.idButacaSala === id
                    ? {
                          ...b,
                          estado:
                              b.estado === "seleccionado"
                                  ? "disponible"
                                  : "seleccionado",
                      }
                    : b
            )
        );

        setSelectedButacas((prev) => {
            const exists = prev.some((b) => b.idButacaSala === id);
            if (exists) {
                return prev.filter((b) => b.idButacaSala !== id);
            } else {
                return [...prev, { ...butaca }];
            }
        });
    };

    const resetButacas = () => {
        setButacas((prev) =>
            prev.map((b) =>
                b.estado === "seleccionado"
                    ? { ...b, estado: "disponible" }
                    : b
            )
        );
        setSelectedButacas([]);
    };

    return {
        butacas,
        setButacas,
        selectedButacas,
        toggleButaca,
        resetButacas,
        totalSelected: selectedButacas.length,
    };
};
