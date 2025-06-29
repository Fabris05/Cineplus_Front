import { useState } from "react";

export const useButacas = (initialButacas = []) => {
    const [butacas, setButacas] = useState(initialButacas);
    const [selectedButacas, setSelectedButacas] = useState([]);

    const toggleButaca = (id) => {
        setButacas(prevButacas => 
            prevButacas.map(butaca => 
                butaca.id === id
                    ? { 
                        ...butaca, 
                        estado: butaca.estado === "seleccionado" ? "disponible" : "seleccionado" 
                      } 
                    : butaca
            )
        );

        setSelectedButacas(prev => {
            const exists = prev.some(b => b.id === id);
            if (exists) {
                return prev.filter(b => b.id !== id);
            } else {
                const butaca = butacas.find(b => b.id === id);
                return butaca ? [...prev, butaca] : prev;
            }
        });
    };

    const resetButacas = () => {
        setButacas(prevButacas => 
            prevButacas.map(butaca => 
                butaca.estado === "seleccionado" 
                    ? { ...butaca, estado: "disponible" } 
                    : butaca
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