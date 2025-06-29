"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModalEntrada({
    isOpen,
    onClose,
    handlerAddEntrada,
    handlerUpdateEntrada,
    initialEntradaForm,
    isEdit,
}) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState(initialEntradaForm);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await handlerUpdateEntrada(form);
        } else {
            await handlerAddEntrada(form);
        }
        router.refresh();
        onClose();
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imagen") {
            setForm({ ...form, imagen: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    useEffect(() => {
        if (isOpen) {
            setForm(initialEntradaForm);
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
                    {isEdit ? "Editar Entrada" : "Registrar Entrada"}
                </h3>

                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-4">
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Entrada
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el tipo de entrada"
                                name="tipo"
                                value={form.tipo}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </label>
                        <div className="flex flex-col form-control w-full max-w-md-sm gap-3">
                            <label className="label">
                                <span className="label-text font-bold text-black">
                                    Descripción
                                </span>
                            </label>
                            <textarea
                                className="textarea w-full textarea-bordered bg-white text-black resize-none"
                                placeholder="Escribe la descripción del bocadito"
                                rows={4}
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                autoComplete="off"
                            ></textarea>
                        </div>
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Precio
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el precio"
                                name="precio"
                                value={form.precio}
                                onChange={handleChange}
                            />
                        </label>
                        {!isEdit && (
                            <label className="select input-neutral bg-white w-full max-w-md">
                                <span className="label text-black font-bold w-40">
                                    Estado
                                </span>
                                <select
                                    name="estado"
                                    value={form.estado}
                                    onChange={handleChange}
                                    className="text-black"
                                >
                                    <option value="No listado">
                                        No Listado
                                    </option>
                                </select>
                            </label>
                        )}
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
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
