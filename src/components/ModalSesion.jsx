"use client";
import { useState } from "react";
import Swal from "sweetalert2";

export const ModalSesion = ({ isOpen, onClose }) => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleLogin = async () => {
        try {
            // Aquí va tu llamada al backend (ejemplo con fetch o axios)
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, contrasena }),
            });

            if (!res.ok) throw new Error("Credenciales incorrectas");

            const data = await res.json();
            localStorage.setItem("usuarioCinePlus", JSON.stringify(data));
            Swal.fire({
                title: "Bienvenido",
                text: "Inicio de sesión exitoso",
                icon: "success",
                background: 'rgba(255, 255, 255, 0.9)',
                backdrop: 'blur(4px)',
                confirmButtonColor: '#ec4899',
            });
            onClose();
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error",
                background: 'rgba(255, 255, 255, 0.9)',
                backdrop: 'blur(4px)',
                confirmButtonColor: '#ec4899',
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 w-full max-w-md overflow-hidden">
                {/* Encabezado con estilo bento */}
                <div className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 p-5 border-b border-white/30">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-cyan-900 flex items-center">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                            Iniciar Sesión
                            <span className="w-2 h-2 bg-pink-400 rounded-full ml-2"></span>
                        </h2>
                        <button 
                            onClick={onClose}
                            className="text-cyan-700 hover:text-cyan-900 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Cuerpo del modal */}
                <div className="p-6 space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm text-cyan-700/80 font-bold">Usuario</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="input w-full bg-white/50 text-gray-900 border border-white/70 mt-3 focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-200/30"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-cyan-700/80 font-bold">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            className="input w-full bg-white/50 text-gray-900 border border-white/70 mt-3 focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-200/30"
                        />
                    </div>

                    {/* Elemento decorativo bento */}
                    <div className="bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-lg p-3 border border-white/30 flex items-center">
                        <div className="w-8 h-8 bg-pink-400/20 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <p className="text-sm text-cyan-800/80 font-bold">Tus datos están protegidos</p>
                    </div>
                </div>

                {/* Pie del modal */}
                <div className="px-6 pb-6 pt-3 border-t border-white/30">
                    <div className="flex justify-end gap-3">
                        <button 
                            className="btn bg-white/70 text-cyan-700 border border-white/50 shadow-sm hover:shadow-md hover:bg-white/90"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            className="btn bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none shadow-sm hover:shadow-md"
                            onClick={handleLogin}
                        >
                            Acceder
                        </button>
                    </div>
                </div>

                {/* Elementos decorativos frutiger */}
                <div className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full bg-cyan-400/20 backdrop-blur-sm border border-white/30 z-[-1]"></div>
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-pink-400/20 backdrop-blur-sm border border-white/30 z-[-1]"></div>
            </div>
        </div>
    );
};