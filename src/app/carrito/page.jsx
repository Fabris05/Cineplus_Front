"use client";

import { Header } from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CarritoPage() {
    const { cartItems, removeCart, clearCart, totalPrice } = useCart();

    const subtotal = totalPrice / 1.18;
    const igv = totalPrice - subtotal;

    const router = useRouter();

    const handleClearCart = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminarán todos los productos del carrito.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar",
            background: "rgba(255, 255, 255, 0.9)",
            backdrop: "blur(4px)",
            confirmButtonColor: "#ec4899",
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire({
                    title: "Carrito vacío",
                    text: "Tu carrito ha sido vaciado.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdrop: "blur(4px)",
                });
            }
        });
    };

    const handleDeleteItem = (idOrNombre, tipo) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminará el producto del carrito.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            background: "rgba(255, 255, 255, 0.9)",
            backdrop: "blur(4px)",
            confirmButtonColor: "#ec4899",
        }).then((result) => {
            if (result.isConfirmed) {
                removeCart(idOrNombre, tipo); // ✅ PASAR AMBOS PARÁMETROS
                Swal.fire({
                    title: "Producto eliminado",
                    text: "El producto ha sido eliminado.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdrop: "blur(4px)",
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            <Header />

            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-cyan-900 flex items-center">
                        <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
                        Tu carrito de compras
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-white/50 text-center">
                        <p className="text-cyan-700/90 text-lg">
                            Tu carrito está vacío.
                        </p>
                        <div className="mt-4 inline-flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                            <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lista de productos */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50 hover:border-cyan-200/50 transition-all"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-20 h-20 bg-cyan-100/50 rounded-lg flex items-center justify-center overflow-hidden">
                                                {item.imagen ? (
                                                    <img
                                                        src={item.imagen}
                                                        alt={item.nombre}
                                                        className="w-full h-full object-scale-down object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-cyan-400 text-2xl">
                                                        🛒
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-cyan-900 text-lg">
                                                {item.nombre}
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4 mt-2">
                                                <div>
                                                    <p className="text-sm text-cyan-700/80">
                                                        Cantidad:
                                                    </p>
                                                    <p className="font-medium text-gray-700/90">
                                                        {item.cantidad}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-cyan-700/80">
                                                        Precio unitario:
                                                    </p>
                                                    <p className="font-medium text-gray-700/90">
                                                        S/.{" "}
                                                        {item.precio.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-cyan-700/80">
                                                        Subtotal:
                                                    </p>
                                                    <p className="font-medium text-gray-700/90">
                                                        S/.{" "}
                                                        {(
                                                            item.precio *
                                                            item.cantidad
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <button
                                                onClick={() =>
                                                    handleDeleteItem(
                                                        item.tipo === "bocadito"
                                                            ? item.id
                                                            : item.nombre,
                                                        item.tipo
                                                    )
                                                }
                                                className="btn btn-sm bg-gradient-to-r from-pink-400 to-rose-400 text-white border-none shadow-sm hover:shadow-md"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumen de compra */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50 sticky top-4">
                                <h2 className="text-xl font-bold text-cyan-900 mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                                    Resumen de compra
                                </h2>

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

                                <div className="mt-6 space-y-3">
                                    <button
                                        onClick={handleClearCart}
                                        className="btn w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white border-none shadow-sm hover:shadow-md"
                                    >
                                        Vaciar carrito
                                    </button>
                                    <button
                                        className="btn w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none shadow-sm hover:shadow-md"
                                        onClick={() => router.push("/pago")}
                                    >
                                        Proceder al pago
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Elementos decorativos Frutiger */}
            <div className="fixed bottom-10 left-10 w-12 h-12 rounded-full bg-pink-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
            <div className="fixed top-1/3 right-20 w-8 h-8 rounded-full bg-yellow-400/20 backdrop-blur-md border border-white/30 shadow-lg"></div>
        </div>
    );
}
