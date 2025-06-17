import { useEffect, useState } from "react";

export default function ModalPelicula({
    isOpen,
    onClose,
    handlerAddMovie,
    initialForm,
}) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario completo:", form); // ¿imagen está definida?
        await handlerAddMovie(form);
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

                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-4">
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Título
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el Título"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
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
                                name="director"
                                value={form.director}
                                onChange={handleChange}
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
                                name="horas"
                                value={form.horas}
                                onChange={handleChange}
                            />
                            <label className="text-black">:</label>
                            <input
                                type="text"
                                className="text-black w-19"
                                placeholder="minutos"
                                name="minutos"
                                value={form.minutos}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="select input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Género
                            </span>
                            <select
                                className="text-black"
                                name="genero"
                                value={form.genero}
                                onChange={handleChange}
                            >
                                <option value="Romance">Romance</option>
                                <option value="Drama">Drama</option>
                                <option value="Sci-fi">Ciencia Ficción</option>
                            </select>
                        </label>

                        <label className="select input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Clasificación
                            </span>
                            <select
                                className="text-black"
                                name="clasificacion"
                                value={form.clasificacion}
                                onChange={handleChange}
                            >
                                <option value="APT">Apto para todos</option>
                                <option value="+12">Mayores de 12 años</option>
                                <option value="+14">Mayores de 14 años</option>
                                <option value="+18">Mayores de 18 años</option>
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
                                name="sinopsis"
                                value={form.sinopsis}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <label className="select input-neutral bg-white w-full max-w-md">
                            <span className="label text-black font-bold w-40">
                                Estado
                            </span>
                            <select
                                name="estado"
                                value={form.estado}
                                onChange={handleChange}
                                className="text-black"
                                readOnly={true}
                            >
                                <option value="No listado">No Listado</option>
                            </select>
                        </label>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-black">
                                Selecciona una imagen
                            </legend>
                            <input
                                type="file"
                                className="file-input w-full bg-white text-black"
                                name="imagen"
                                onChange={handleChange}
                            />
                        </fieldset>
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
