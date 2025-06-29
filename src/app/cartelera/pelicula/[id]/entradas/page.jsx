// app/pelicula/[id]/entradas/page.js
"use client";

import { Header } from "@/components/Header";
import { useCart } from "@/hooks/useCart";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EntradasPage() {
    const { id } = useParams();
    const router = useRouter();
    const [entradaList, setEntradaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reservation, setReservation] = useState(null);
    const [ticketQuantities, setTicketQuantities] = useState({});
    const { addToCart } = useCart();

    const getEntradas = async () => {
        const response = await axios.get("http://localhost:8080/tipoentrada");
        setEntradaList(response.data);
        setLoading(false);
    };

    useEffect(() => {
        const savedReservation = localStorage.getItem("currentReservation");
        if (savedReservation) {
            setReservation(JSON.parse(savedReservation));
        } else {
            router.push(`/pelicula/${id}`);
        }
        getEntradas();
    }, [id, router]);

    const handleQuantityChange = (entradaId, quantity) => {
        setTicketQuantities((prev) => ({
            ...prev,
            [entradaId]: quantity,
        }));
    };

    const calculateTotal = () => {
        return entradaList.reduce((total, entrada) => {
            const quantity = ticketQuantities[entrada.id] || 0;
            return total + entrada.precio * quantity;
        }, 0);
    };

    const handleAddToCart = () => {
        const selectedTickets = entradaList
            .filter((entrada) => ticketQuantities[entrada.id] > 0)
            .map((entrada) => ({
                id: entrada.id,
                name: entrada.nombre,
                price: entrada.precio,
                quantity: ticketQuantities[entrada.id],
            }));

        if (selectedTickets.length === 0) {
            alert("Por favor selecciona al menos una entrada");
            return;
        }

        const cartItem = {
            id: `reservation-${Date.now()}`,
            movie: reservation.movie.nombre,
            horario: reservation.horario.hora,
            seats: reservation.butacas.map((b) => `${b.fila}${b.numero}`),
            tickets: selectedTickets,
            price: calculateTotal(),
        };

        addToCart(cartItem);
        router.push("/cartelera");
    };

    if (loading || !reservation) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-spinner text-cyan-400"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            <Header />

            <div className="container mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-cyan-700/80 mb-6">
                    <Link
                        href="/cartelera"
                        className="hover:text-cyan-600 transition-colors"
                    >
                        Cartelera
                    </Link>
                    <span className="mx-2">/</span>
                    <Link
                        href={`/pelicula/${id}`}
                        className="hover:text-cyan-600 transition-colors"
                    >
                        {reservation.movie.nombre}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-cyan-900 font-medium">Entradas</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Resumen */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                            <h2 className="text-xl font-bold text-cyan-900 mb-4">
                                Resumen
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-cyan-900">
                                        {reservation.movie.nombre}
                                    </h3>
                                    <p className="text-sm text-cyan-700/80">
                                        {reservation.horario.hora} - Sala{" "}
                                        {reservation.horario.sala.nombre}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium text-cyan-900">
                                        Butacas seleccionadas
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {reservation.butacas.map((butaca) => (
                                            <span
                                                key={butaca.id}
                                                className="badge bg-cyan-400/20 text-cyan-700 border-cyan-400/30"
                                            >
                                                {butaca.fila}
                                                {butaca.numero}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selección de entradas */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                            <h2 className="text-xl font-bold text-cyan-900 mb-6 flex items-center">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                                Selecciona tus entradas
                            </h2>

                            <div className="space-y-6">
                                {entradaList.map((entrada) => (
                                    <div
                                        key={entrada.id}
                                        className="flex justify-between items-center border-b border-white/30 pb-4"
                                    >
                                        <div>
                                            <h3 className="font-medium text-cyan-900">
                                                {entrada.nombre}
                                            </h3>
                                            <p className="text-sm text-cyan-700/80">
                                                {entrada.descripcion}
                                            </p>
                                            <p className="font-medium text-cyan-600 mt-1">
                                                ${entrada.precio}
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        entrada.id,
                                                        (ticketQuantities[
                                                            entrada.id
                                                        ] || 0) - 1
                                                    )
                                                }
                                                disabled={
                                                    (ticketQuantities[
                                                        entrada.id
                                                    ] || 0) <= 0
                                                }
                                                className="btn btn-sm btn-circle bg-cyan-400/20 border-cyan-400/30 text-cyan-700 disabled:bg-gray-200/50"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center">
                                                {ticketQuantities[entrada.id] ||
                                                    0}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        entrada.id,
                                                        (ticketQuantities[
                                                            entrada.id
                                                        ] || 0) + 1
                                                    )
                                                }
                                                className="btn btn-sm btn-circle bg-cyan-400/20 border-cyan-400/30 text-cyan-700"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="mt-8 pt-4 border-t border-white/30">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-cyan-900">
                                            Total:
                                        </p>
                                        <p className="text-2xl font-bold text-cyan-600">
                                            ${calculateTotal().toFixed(2)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        className="btn bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none shadow-sm hover:shadow-md"
                                    >
                                        Confirmar compra
                                    </button>
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
