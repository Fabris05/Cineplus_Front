"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ModalCartelera({
    isOpen,
    movie = [],
    onClose,
    handlerAddCartelera,
}) {
    const [horario, setHorario] = useState([]);
    const [sala, setSala] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        idSala: "",
        idHorarios: [],
        fecha: new Date().toISOString().split("T")[0],
    });

    const { idPelicula, nombre } = movie;

    const getHorarios = async () => {
        const response = await axios.get("http://localhost:8080/horario");
        setHorario(response.data);
    };

    const getSalas = async () => {
        const response = await axios.get("http://localhost:8080/salas");
        setSala(response.data);
    };

    const toggleHorario = (idHorario) => {
        setForm((prev) => {
            const yaSeleccionado = prev.idHorarios.includes(idHorario);
            const nuevosHorarios = yaSeleccionado
                ? prev.idHorarios.filter((id) => id !== idHorario)
                : [...prev.idHorarios, idHorario];
            return { ...prev, idHorarios: nuevosHorarios };
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handlerAddCartelera({
                idPelicula,
                idSala: parseInt(form.idSala),
                idHorarios: form.idHorarios,
                fecha: form.fecha,
            });
            onClose();
        } catch (err) {
            alert("Error al guardar la cartelera");
        }
    };

    const handleChange = (e) => {
        const { name, value, options } = e.target;

        if (name === "idHorarios") {
            const selectedValues = Array.from(options)
                .filter((opt) => opt.selected)
                .map((opt) => parseInt(opt.value));
            setForm((prev) => ({ ...prev, [name]: selectedValues }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        if (isOpen) {
            getHorarios();
            getSalas();
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
                    Configuración de Película
                </h3>

                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-4">
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Pelicula
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el Título"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="select input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Selecciona la Sala
                            </span>
                            <select
                                className="text-black"
                                name="idSala"
                                value={sala.idSala}
                                onChange={handleChange}
                            >   
                                <option value="">Selecciona una sala</option>
                                {sala.map((sala, index) => (
                                    <option value={sala.idSala} key={index}>
                                        {sala.numero}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="dropdown w-full max-w-md">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn w-full bg-gray-100 text-black justify-start"
                            >
                                {form.idHorarios.length > 0
                                    ? `Horarios seleccionados: ${form.idHorarios.length}`
                                    : "Selecciona horarios"}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-full max-w-md max-h-60 overflow-y-auto"
                            >
                                {horario.map((horario) => (
                                    <li key={horario.idHorario}>
                                        <label className="label cursor-pointer justify-start gap-2">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                checked={form.idHorarios.includes(
                                                    horario.idHorario
                                                )}
                                                onChange={() =>
                                                    toggleHorario(
                                                        horario.idHorario
                                                    )
                                                }
                                            />
                                            <span className="text-black">
                                                {horario.hora}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
