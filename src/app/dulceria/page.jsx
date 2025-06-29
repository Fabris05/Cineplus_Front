"use client";

import { Header } from "@/components/Header";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function BocaditosPage() {
    const [snacks, setSnacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, cartItems } = useCart();
    const getSnacks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bocaditos");
            setSnacks(response.data);
        } catch (error) {
            console.error("Error fetching snacks:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlerAddToCart = (snack) => {
        console.log(snack);
        addToCart({
            id: snack.idBocadito,
            nombre: snack.nombre,
            precio: snack.precio,
            imagen: snack.imagen,
            cantidad: 1
        });
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto agregado al carrito",
            showConfirmButton: false,
            timer: 1500
        });
    }

    useEffect(() => {
        getSnacks();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            <Header />

            <div className="container mx-auto px-6 py-8">
                {/* Título */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-cyan-900 flex items-center">
                        <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></span>
                        Bocaditos y Bebidas
                    </h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner text-cyan-400"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {snacks.map((snack, index) => (
                            <div
                                key={index}
                                className="bg-white backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-white/50 hover:border-cyan-200/50"
                            >
                                <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gray-100/20">
                                    <img
                                        src={
                                            snack.imagen ||
                                            "https://via.placeholder.com/300x300/CFECEC/7AB8B8?text=Snack"
                                        }
                                        alt={snack.nombre}
                                        className="max-h-full max-w-full object-scale-down"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-cyan-900 text-lg mb-1">
                                        {snack.nombre}
                                    </h3>
                                    <p className="text-cyan-700/80 text-sm mb-3 line-clamp-2">
                                        {snack.descripcion}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-cyan-600">
                                            S/.{snack.precio.toFixed(2)}
                                        </span>
                                        <button
                                            className="btn btn-sm bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none shadow-sm hover:shadow-md"
                                            onClick={() => handlerAddToCart({...snack})}
                                        >
                                            Añadir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Elementos decorativos Frutiger */}
            <div className="fixed bottom-10 left-10 w-12 h-12 rounded-full bg-pink-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
            <div className="fixed top-1/3 right-20 w-8 h-8 rounded-full bg-yellow-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
        </div>
    );
}
