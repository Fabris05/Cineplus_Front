import { useEffect, useState } from "react";

export default function ModalPelicula({ isOpen, onClose }) {
    const [show, setShow] = useState(false);

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
                    Agregar Película
                </h3>

                <form>
                    <div className="flex flex-col gap-4">
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Título
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el Título"
                            />
                        </label>
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Director
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el director"
                            />
                        </label>
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-29">
                                Duración
                            </span>
                            <input
                                type="text"
                                className="text-black w-19"
                                placeholder="horas"
                            />
                            <label className="text-black">:</label>
                            <input
                                type="text"
                                className="text-black w-19"
                                placeholder="minutos"
                            />
                        </label>
                        <label className="select input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Género
                            </span>
                            <select className="text-black">
                                <option>Personal</option>
                                <option>Business</option>
                            </select>
                        </label>

                        <label className="select input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Clasificación
                            </span>
                            <select className="text-black">
                                <option>Personal</option>
                                <option>Business</option>
                            </select>
                        </label>
                        <div className="flex flex-col form-control w-full max-w-md-sm gap-3">
                            <label className="label">
                                <span className="label-text font-bold text-black">
                                    Descripción
                                </span>
                            </label>
                            <textarea
                                className="textarea w-full textarea-bordered bg-white text-black resize-none"
                                placeholder="Escribe la descripción de la película"
                                rows={4}
                            ></textarea>
                        </div>
                        <label className="select input-neutral bg-white w-full max-w-md">
                            <span className="label text-black font-bold w-40">
                                Estado
                            </span>
                            <select className="text-black" disabled={true}>
                                <option>No Listado</option>
                            </select>
                        </label>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-black">
                                Selecciona una imagen
                            </legend>
                            <input type="file" className="file-input w-full bg-white text-black" />
                        </fieldset>
                    </div>
                </form>
                <div className="flex justify-end mt-4">
                    <button
                        className="btn bg-red-600 text-white hover:bg-red-700 transition-colors"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>

                    <button
                        className="btn bg-green-600 text-white hover:bg-green-700 transition-colors"
                        onClick={onClose}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
