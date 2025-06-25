"use client";

import { MovieContext } from "@/context/MovieContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ModalEstado({ initialForm, isOpen, onClose }) {
    const { handlerChangeState } = useContext(MovieContext);
    const [show, setShow] = useState(false);
    const router = useRouter();

    const estado = initialForm.estado;
    const idPel = initialForm.idPelicula;
    const idBoc = initialForm.idBocadito;
    const idEn = initialForm.idTipoEntrada;

    const tipo = idPel ? "peliculas" : idBoc ? "bocaditos" : "tipoentrada";

    const id = idPel ?? idBoc ?? idEn;

    const nextState = estado === "No listado" ? "Listado" : "No listado";

    const onSubmit = async (e) => {
        e.preventDefault();
        await handlerChangeState(id, nextState, tipo);
        onClose();
        router.refresh();
    };

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`
                    transform bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-all duration-400
                    ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
            >
                <h3 className="text-lg font-bold mb-4 text-black">
                    Editar Estado
                </h3>

                <form>
                    <div className="flex flex-col gap-4">
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Estado actual
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                disabled={true}
                                value={estado}
                            />
                        </label>

                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Nuevo estado
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                readOnly={true}
                                value={nextState}
                            />
                        </label>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            className="btn bg-red-600 text-white hover:bg-red-700 transition-colors"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>

                        <button
                            className="btn bg-green-600 text-white hover:bg-green-700 transition-colors"
                            type="submit"
                            onClick={onSubmit}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
