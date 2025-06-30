"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GraciasPage() {
    const router = useRouter();
    const [codigo, setCodigo] = useState("");
    const [fecha, setFecha] = useState("");

    useEffect(() => {
        setCodigo(`CNP-${Math.floor(Math.random() * 10000)}`);
        setFecha(new Date().toLocaleDateString());
        localStorage.removeItem("currentReservation");
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            {/* Elementos decorativos flotantes */}
            <div className="fixed top-1/4 left-1/4 w-16 h-16 rounded-full bg-cyan-400/20 backdrop-blur-md border border-white/30 shadow-lg animate-float"></div>
            <div className="fixed bottom-1/3 right-1/3 w-12 h-12 rounded-full bg-pink-400/20 backdrop-blur-md border border-white/30 shadow-lg animate-float-delay"></div>
            <div className="fixed top-1/2 right-1/4 w-8 h-8 rounded-full bg-yellow-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>

            <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center">
                {/* Tarjeta principal bento */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 max-w-2xl w-full text-center">
                    {/* Icono de confirmación */}
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-bold text-cyan-900 mb-4 flex items-center justify-center">
                        <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></span>
                        ¡Gracias por tu compra!
                        <span className="w-3 h-3 bg-pink-400 rounded-full ml-3"></span>
                    </h1>

                    <p className="text-cyan-700/90 text-lg mb-8">
                        Tu compra en CinePlus ha sido procesada con éxito. Hemos
                        enviado los detalles a tu correo electrónico.
                    </p>

                    {/* Detalles de la compra (ejemplo) */}
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-8 border border-white/50">
                        <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center">
                            <svg
                                className="w-5 h-5 mr-2 text-cyan-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                                />
                            </svg>
                            Resumen de tu compra
                        </h2>

                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div>
                                <p className="font-medium font-bold text-cyan-700/80">
                                    N° de transacción:
                                </p>
                                <p className="font-medium text-cyan-700/90">
                                    {codigo}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium font-bold text-cyan-700/80">
                                    Fecha:
                                </p>
                                <p className="font-medium text-cyan-700/90">
                                    {fecha}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Elementos bento decorativos */}
                    <div className="flex justify-center space-x-4 mb-8">
                        <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center border border-white/30">
                            <span className="text-cyan-500">🎬</span>
                        </div>
                        <div className="w-12 h-12 bg-pink-400/10 rounded-lg flex items-center justify-center border border-white/30">
                            <span className="text-pink-500">🍿</span>
                        </div>
                        <div className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center border border-white/30">
                            <span className="text-yellow-500">🥤</span>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            className="btn bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none shadow-sm hover:shadow-md"
                            onClick={() => router.push("/cartelera")}
                        >
                            Ver más películas
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="btn bg-white/70 text-cyan-700 border border-white/50 shadow-sm hover:shadow-md"
                        >
                            Imprimir comprobante
                        </button>
                    </div>
                </div>

                {/* Mensaje adicional */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mt-8 shadow-sm border border-white/50 max-w-2xl w-full text-center">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    </div>
                    <p className="text-cyan-700/80">
                        ¿Necesitas ayuda?{" "}
                        <a href="#" className="text-cyan-600 hover:underline">
                            Contáctanos
                        </a>{" "}
                        en nuestro centro de soporte.
                    </p>
                </div>
            </div>
        </div>
    );
}
