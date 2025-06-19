"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModalUsuario({isOpen, onClose, handlerAddUser, initialUserForm,}){
    
    const[show, setShow] = useState(false)
    const[form, setForm] = useState(initialUserForm)
    const router = useRouter();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        await handlerAddUser(form);
        onClose();
        router.refresh();
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
            setForm(initialUserForm);
            setShow(true);
        } else {
            setShow(false);
        }
    }, [isOpen, initialUserForm]);

    if (!isOpen) return null;
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`
                    transform bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-all duration-400
                    ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
            >
                <h3 className="text-lg font-bold mb-4 text-black">
                    Registrar Usuario
                </h3>

                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-4">
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Nombre
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el nombre"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Apellido
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el apellido"
                                name="apellido"
                                value={form.apellido}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Email
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Num. documento
                            </span>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Ingrese el num. documento"
                                name="numDocumento"
                                value={form.numDocumento}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="input input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Contraseña
                            </span>
                            <input
                                type="password"
                                className="text-black"
                                placeholder="Ingrese la contraseña"
                                name="contrasenia"
                                value={form.contrasenia}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="select input-neutral bg-white w-full max-w-md ">
                            <span className="label text-black font-bold w-40">
                                Rol
                            </span>
                            <select
                                className="text-black"
                                name="rol"
                                value={form.rol}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="1">Gerente</option>
                                <option value="2">Vendedor</option>
                            </select>
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
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}