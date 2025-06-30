"use client";

import { Header } from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { usePago } from "@/hooks/usePago";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function PagoPage() {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { obtenerDatosPago } = usePago();
    const router = useRouter();

    const subtotal = totalPrice / 1.18;
    const igv = totalPrice - subtotal;

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        tipoDocumento: "DNI",
        numDocumento: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.nombre ||
            !formData.apellido ||
            !formData.email ||
            !formData.numDocumento
        ) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Por favor completa todos los campos requeridos",
                icon: "warning",
                background: "rgba(255, 255, 255, 0.9)",
                backdrop: "blur(4px)",
                confirmButtonColor: "#ec4899",
            });
            return;
        }

        const ventaPayload = obtenerDatosPago(formData);

        if (!ventaPayload) {
            Swal.fire({
                title: "Error",
                text: "No se pudo preparar la información de la venta.",
                icon: "error",
            });
            return;
        }

        await axios.post("http://localhost:8080/venta/registrar", ventaPayload);

        Swal.fire({
            title: "¡Pago realizado!",
            text: "Gracias por tu compra en CinePlus.",
            icon: "success",
            background: "rgba(255, 255, 255, 0.9)",
            backdrop: "blur(4px)",
            confirmButtonColor: "#ec4899",
        });

        clearCart();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            <Header />

            {/* Elementos decorativos Frutiger Aero */}
            <div className="fixed top-20 left-10 w-16 h-16 rounded-full bg-cyan-400/20 backdrop-blur-md border border-white/30 shadow-lg animate-float"></div>
            <div className="fixed bottom-1/3 right-1/4 w-10 h-10 rounded-full bg-pink-400/20 backdrop-blur-md border border-white/30 shadow-lg animate-float-delay"></div>
            <div className="fixed top-1/2 left-1/4 w-8 h-8 rounded-full bg-yellow-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>

            <div className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-cyan-900 mb-8 flex items-center">
                    <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
                    Resumen y Pago
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Formulario del cliente (izquierda) */}
                    <div className="space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50 hover:border-cyan-200/50 transition-all">
                            <h2 className="text-xl font-bold text-cyan-900 mb-6 flex items-center">
                                <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                                Datos del Cliente
                            </h2>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="space-y-1">
                                    <label className="text-sm text-cyan-700/80 font-bold">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Ingresa tu nombre"
                                        className="input w-full bg-white/50 text-cyan-900 border border-white/70 focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-200/30"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm text-cyan-700/80 font-bold">
                                        Apellido
                                    </label>
                                    <input
                                        type="text"
                                        name="apellido"
                                        placeholder="Ingresa tu apellido"
                                        className="input w-full bg-white/50 text-cyan-900 border border-white/70 focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-200/30"
                                        value={formData.apellido}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm text-cyan-700/80 font-bold">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="tu@email.com"
                                        className="input w-full bg-white/50 text-cyan-900 border border-white/70 focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-200/30"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm text-cyan-700/80 font-bold">
                                            Tipo de documento
                                        </label>
                                        <select
                                            name="tipoDocumento"
                                            className="select w-full bg-white/50 text-cyan-900 border border-white/70 focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-200/30"
                                            value={formData.tipoDocumento}
                                            onChange={handleInputChange}
                                        >
                                            <option value="DNI">DNI</option>
                                            <option value="CE">CE</option>
                                            <option value="Pasaporte">
                                                Pasaporte
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm text-cyan-700/80 font-bold">
                                            Número
                                        </label>
                                        <input
                                            type="text"
                                            name="numDocumento"
                                            placeholder="Número de documento"
                                            className="input w-full bg-white/50 text-cyan-900 border border-white/70 focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-200/30"
                                            value={formData.numDocumento}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none shadow-sm hover:shadow-md mt-6"
                                    onClick={ () => router.push("/pago/gracias")}
                                >
                                    Confirmar y pagar
                                </button>
                            </form>
                        </div>

                        {/* Tarjeta decorativa */}
                        <div className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/70 rounded-full flex items-center justify-center">
                                    <span className="text-cyan-500 text-xl">
                                        💳
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-medium text-cyan-900">
                                        Pago seguro
                                    </h3>
                                    <p className="text-sm text-cyan-700/80">
                                        Tus datos están protegidos
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 inline-flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            </div>
                        </div>
                    </div>

                    {/* Resumen de productos (derecha) */}
                    <div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50 hover:border-cyan-200/50 transition-all sticky top-4">
                            <h2 className="text-xl font-bold text-cyan-900 mb-6 flex items-center">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                Resumen de compra
                            </h2>

                            <div className="space-y-4">
                                <h3 className="font-medium text-cyan-800">
                                    Productos
                                </h3>
                                <ul className="space-y-3">
                                    {cartItems.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex justify-between items-center"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-cyan-100/50 rounded-lg flex items-center justify-center">
                                                    {item.imagen ? (
                                                        <img
                                                            src={item.imagen}
                                                            alt={item.nombre}
                                                            className="w-8 h-8 object-contain"
                                                        />
                                                    ) : (
                                                        <span className="text-cyan-400">
                                                            🎬
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-cyan-800">
                                                    {item.nombre} ×{" "}
                                                    {item.cantidad}
                                                </span>
                                            </div>
                                            <span className="font-medium text-gray-700/90">
                                                S/.{" "}
                                                {(
                                                    item.precio * item.cantidad
                                                ).toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <hr className="my-5 border-white/40" />

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-cyan-700/90">
                                        Subtotal:
                                    </span>
                                    <span className="font-medium text-gray-700/90">
                                        S/. {subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-cyan-700/90">
                                        IGV (18%):
                                    </span>
                                    <span className="font-medium text-gray-700/90">
                                        S/. {igv.toFixed(2)}
                                    </span>
                                </div>
                                <div className="border-t border-white/30 pt-3 mt-3 flex justify-between font-bold text-cyan-900">
                                    <span>Total:</span>
                                    <span>S/. {totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Elemento decorativo bento */}
                            <div className="mt-6 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-lg p-3 border border-white/30">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-pink-400/20 rounded-full flex items-center justify-center">
                                        <span className="text-pink-500 text-sm">
                                            ✨
                                        </span>
                                    </div>
                                    <p className="text-sm text-cyan-700/80">
                                        ¡Disfruta de tu visita a CinePlus!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Elementos decorativos Frutiger */}
            <div className="fixed bottom-10 left-10 w-12 h-12 rounded-full bg-pink-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
            <div className="fixed top-1/3 right-20 w-8 h-8 rounded-full bg-yellow-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
        </div>
    );
}
