"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { Header } from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function EntradasPage() {
    const router = useRouter();
    const [tiposEntrada, setTiposEntrada] = useState([]);
    const [entradasSeleccionadas, setEntradasSeleccionadas] = useState([]);
    const [reserva, setReserva] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const reservaStorage = localStorage.getItem("currentReservation");
        if (reservaStorage) {
            setReserva(JSON.parse(reservaStorage));
        } else {
            router.push("/cartelera");
        }

        const fetchEntradas = async () => {
            const res = await axios.get("http://localhost:8080/tipoentrada");
            setTiposEntrada(res.data);
            setEntradasSeleccionadas(new Array(res.data.length).fill(0));
        };

        fetchEntradas();
    }, []);

    if (!reserva || tiposEntrada.length === 0) return <p>Cargando...</p>;

    const totalButacas = reserva.butacas.length;
    const totalEntradas = entradasSeleccionadas.reduce((a, b) => a + b, 0);

    const actualizarEntrada = (index, cantidad) => {
        const copia = [...entradasSeleccionadas];
        copia[index] = cantidad;
        setEntradasSeleccionadas(copia);
    };

    const handleAgregarAlCarrito = async () => {
        if (totalEntradas !== totalButacas) {
            await Swal.fire({
                title: "Cantidad incorrecta",
                text: `Debes seleccionar exactamente ${totalButacas} entradas`,
                icon: "warning",
                background: "rgba(255, 255, 255, 0.9)",
                backdrop: "blur(4px)",
                confirmButtonColor: "#ec4899",
            });
            return;
        }

        const confirm = await Swal.fire({
            title: "¿Deseas añadir estas entradas al carrito?",
            text: "Una vez añadidas no se podrán modificar desde esta vista.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, añadir",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#ef4444",
            background: "rgba(255, 255, 255, 0.9)",
            backdrop: "blur(4px)",
        });

        if (!confirm.isConfirmed) return;

        const detalleEntradas = tiposEntrada
            .map((tipo, i) => ({
                idTipoEntrada: tipo.idTipoEntrada,
                tipo: tipo.tipo,
                cantidad: entradasSeleccionadas[i],
                precioUnitario: tipo.precio,
                total: entradasSeleccionadas[i] * tipo.precio,
            }))
            .filter((e) => e.cantidad > 0);

        // Añadir cada entrada al carrito
        detalleEntradas.forEach((entrada) => {
            addToCart({
                id: entrada.idTipoEntrada,
                idTipoEntrada: entrada.idTipoEntrada,
                nombre: entrada.tipo,
                cantidad: entrada.cantidad,
                precio: entrada.precioUnitario,
                tipo: "entrada",
            });
        });

        await Swal.fire({
            title: "Entradas añadidas",
            text: "Tus entradas se han añadido al carrito correctamente.",
            icon: "success",
            confirmButtonColor: "#3b82f6",
            background: "rgba(255, 255, 255, 0.9)",
            backdrop: "blur(4px)",
        });

        router.push("/carrito");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
            <Header />
            {/* Elementos decorativos Frutiger Aero */}
            <div className="fixed top-20 left-10 w-16 h-16 rounded-full bg-cyan-400/20 backdrop-blur-md border border-white/30 shadow-lg animate-float"></div>
            <div className="fixed bottom-1/3 right-1/4 w-10 h-10 rounded-full bg-pink-400/20 backdrop-blur-md border border-white/30 shadow-lg animate-float-delay"></div>
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-cyan-900 mb-8 flex items-center">
                    <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
                    Selecciona tus entradas
                </h2>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Tipos de entrada (izquierda - 2/3) */}
                    <div className="lg:col-span-2">
                        <div className="grid md:grid-cols-2 gap-6">
                            {tiposEntrada.map((tipo, index) => (
                                <div
                                    key={tipo.idTipoEntrada}
                                    className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50 hover:border-cyan-200/50 transition-all"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-cyan-100/50 rounded-lg flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-cyan-600"
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
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-cyan-800">
                                                {tipo.tipo}
                                            </h3>
                                            <p className="text-cyan-700/80 text-sm mb-3">
                                                {tipo.descripcion}
                                            </p>
                                            <p className="font-medium text-cyan-900 mb-4">
                                                S/. {tipo.precio.toFixed(2)}
                                            </p>
                                            <input
                                                type="number"
                                                min={0}
                                                max={
                                                    totalButacas -
                                                    totalEntradas +
                                                    entradasSeleccionadas[index]
                                                }
                                                value={
                                                    entradasSeleccionadas[index]
                                                }
                                                onChange={(e) => {
                                                    const val =
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0;
                                                    if (
                                                        val <=
                                                        totalButacas -
                                                            (totalEntradas -
                                                                entradasSeleccionadas[
                                                                    index
                                                                ])
                                                    ) {
                                                        actualizarEntrada(
                                                            index,
                                                            val
                                                        );
                                                    }
                                                }}
                                                disabled={
                                                    totalEntradas >=
                                                        totalButacas &&
                                                    entradasSeleccionadas[
                                                        index
                                                    ] === 0
                                                }
                                                className="w-full p-2 bg-white/50 text-cyan-900 border border-white/70 rounded-lg text-center focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-200/30"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumen de butacas */}
                        <div className="mt-8 bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50">
                            <h3 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                Tus asientos seleccionados
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {reserva.butacas.map((b, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-cyan-100/50 text-cyan-800 rounded-full text-sm flex items-center"
                                    >
                                        <svg
                                            className="w-3 h-3 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                                            />
                                        </svg>
                                        {b.codigo}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Resumen de compra (derecha - 1/3) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50 sticky top-4">
                            <h3 className="text-xl font-semibold text-cyan-800 mb-6 flex items-center">
                                <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                                Resumen de tu selección
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-cyan-700/90">
                                        Total de entradas:
                                    </span>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700/90 mr-2">
                                            {totalEntradas} / {totalButacas}
                                        </span>
                                        {totalEntradas === totalButacas ? (
                                            <svg
                                                className="w-4 h-4 text-green-500"
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
                                        ) : (
                                            <svg
                                                className="w-4 h-4 text-yellow-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                <hr className="border-white/30 my-3" />

                                <h4 className="font-medium text-cyan-800">
                                    Desglose:
                                </h4>
                                <div className="space-y-2">
                                    {tiposEntrada.map(
                                        (tipo, i) =>
                                            entradasSeleccionadas[i] > 0 && (
                                                <div
                                                    key={i}
                                                    className="flex justify-between text-sm"
                                                >
                                                    <span className="text-cyan-700/80">
                                                        {tipo.tipo} ×{" "}
                                                        {
                                                            entradasSeleccionadas[
                                                                i
                                                            ]
                                                        }
                                                    </span>
                                                    <span className="font-medium">
                                                        S/.{" "}
                                                        {(
                                                            entradasSeleccionadas[
                                                                i
                                                            ] * tipo.precio
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            )
                                    )}
                                </div>

                                <hr className="border-white/30 my-3" />

                                <div className="bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-lg p-3 border border-white/30">
                                    <div className="flex justify-between font-bold text-cyan-900">
                                        <span>Total:</span>
                                        <span>
                                            S/.{" "}
                                            {tiposEntrada
                                                .reduce(
                                                    (sum, tipo, i) =>
                                                        sum +
                                                        entradasSeleccionadas[
                                                            i
                                                        ] *
                                                            tipo.precio,
                                                    0
                                                )
                                                .toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleAgregarAlCarrito}
                                className="btn w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none shadow-sm hover:shadow-md mt-6"
                                disabled={totalEntradas !== totalButacas}
                            >
                                Agregar al carrito
                            </button>

                            {/* Elemento decorativo bento */}
                            <div className="mt-6 flex items-center justify-center space-x-2">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full ${
                                            i === 0
                                                ? "bg-cyan-400"
                                                : i === 1
                                                ? "bg-pink-400"
                                                : "bg-yellow-400"
                                        }`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
