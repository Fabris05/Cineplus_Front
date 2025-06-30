"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalSesion } from "./ModalSesion";

export const Header = () => {
    const { cartItems, showCart, toggleCart, totalPrice } = useCart();
    const [showLogin, setShowLogin] = useState(false);
    const router = useRouter();
    return (
        <>
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex flex-row justify-between items-center">
                    {/* Logo */}
                    <h1 className="text-3xl font-bold tracking-tight">
                        <Link href="/cartelera" className="flex items-center">
                            <span className="text-cyan-700">Cine</span>
                            <span className="text-cyan-500">Plus</span>
                            <span className="ml-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        </Link>
                    </h1>

                    {/* Navegación y carrito */}
                    <div className="flex items-center gap-8">
                        <nav>
                            <ul className="flex flex-row gap-8 items-center">
                                <li>
                                    <Link
                                        href="/cartelera"
                                        className="text-cyan-800/90 hover:text-cyan-600 font-medium flex items-center transition-colors duration-300 group"
                                    >
                                        <span className="mr-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                                                />
                                            </svg>
                                        </span>
                                        Cartelera
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/dulceria"
                                        className="text-cyan-800/90 hover:text-cyan-600 font-medium flex items-center transition-colors duration-300 group"
                                    >
                                        <span className="mr-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                                                />
                                            </svg>
                                        </span>
                                        Bocaditos
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Carrito */}
                        <div className="relative">
                            <button
                                onClick={toggleCart}
                                className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-cyan-400/20 transition-colors relative"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-cyan-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-cyan-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItems.reduce(
                                            (sum, item) =>
                                                sum + (item.cantidad || 1),
                                            0
                                        )}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown del carrito */}
                            {showCart && (
                                <div className="absolute right-0 mt-2 w-72 bg-white backdrop-blur-lg rounded-xl shadow-lg border border-white/30 z-50">
                                    <div className="p-4">
                                        <h3 className="font-bold text-cyan-900 mb-3 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                />
                                            </svg>
                                            Tu carrito
                                        </h3>

                                        {cartItems.length === 0 ? (
                                            <p className="text-cyan-700/80 text-sm">
                                                Tu carrito está vacío
                                            </p>
                                        ) : (
                                            <>
                                                <div className="max-h-60 overflow-y-auto space-y-3">
                                                    {cartItems.map(
                                                        (item, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex justify-between items-center border-b border-white/30 pb-2"
                                                            >
                                                                <div>
                                                                    <p className="font-medium text-cyan-900">
                                                                        {
                                                                            item.nombre
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-cyan-700/80">
                                                                        Cantidad:{" "}
                                                                        {
                                                                            item.cantidad
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <p className="font-medium text-cyan-700">
                                                                    S/.{" "}
                                                                    {(
                                                                        item.precio *
                                                                        item.cantidad
                                                                    ).toFixed(2)}
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                <div className="mt-4 pt-3 border-t border-white/30 flex justify-between items-center">
                                                    <span className="font-bold text-cyan-900">
                                                        Total:
                                                    </span>
                                                    <span className="font-bold text-cyan-700">
                                                        S/.{totalPrice.toFixed(2)}
                                                    </span>
                                                </div>
                                                <button
                                                    className="btn btn-sm bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none w-full mt-3"
                                                    onClick={() => {
                                                        router.push("/carrito");
                                                        toggleCart();
                                                    }}
                                                >
                                                    Ver carrito
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowLogin(true)}
                        className="btn btn-sm bg-cyan-500 text-white shadow hover:bg-cyan-600"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </header>
            
            {/* Modal fuera del header */}
            <ModalSesion
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </>
    );
};