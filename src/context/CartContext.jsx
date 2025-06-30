"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem("carritoCinePlus");
        if (stored) {
            const data = JSON.parse(stored);
            const entradas = data.entradas || [];
            const bocaditos = data.bocaditos || [];

            const items = [
                ...entradas.map((e) => ({
                    tipo: "entrada",
                    nombre: e.tipo,
                    cantidad: e.cantidad,
                    precio: e.precioUnitario,
                })),
                ...bocaditos.map((b) => ({
                    tipo: "bocadito",
                    id: b.id,
                    nombre: b.nombre,
                    cantidad: b.cantidad,
                    precio: b.precio,
                })),
            ];

            setCartItems(items);
            setTotalPrice(data.total || 0);
        } else {
            setCartItems([]);
            setTotalPrice(0);
        }
    }, []);

    const updateLocalStorage = (newItems) => {
        const entradas = newItems
            .filter((item) => item.tipo === "entrada")
            .map((e) => ({
                idTipoEntrada: e.idTipoEntrada,
                tipo: e.nombre,
                cantidad: e.cantidad,
                precioUnitario: e.precio,
                total: e.cantidad * e.precio,
            }));

        const bocaditos = newItems
            .filter((item) => item.tipo === "bocadito")
            .map((b) => ({
                id: b.id,
                nombre: b.nombre,
                cantidad: b.cantidad,
                precio: b.precio,
                total: b.cantidad * b.precio,
            }));

        const total = newItems.reduce(
            (sum, i) => sum + i.precio * i.cantidad,
            0
        );

        const data = { entradas, bocaditos, total };
        localStorage.setItem("carritoCinePlus", JSON.stringify(data));
        setTotalPrice(total);
    };

    const addToCart = (newItem) => {
        let updatedItems;

        const existingIndex = cartItems.findIndex(
            (i) =>
                i.tipo === newItem.tipo &&
                ((i.tipo === "bocadito" && i.id === newItem.id) ||
                    (i.tipo === "entrada" && i.nombre === newItem.nombre))
        );

        if (existingIndex !== -1) {
            updatedItems = [...cartItems];
            updatedItems[existingIndex].cantidad += newItem.cantidad;
        } else {
            updatedItems = [...cartItems, newItem];
        }

        setCartItems(updatedItems);

        updateLocalStorage(updatedItems);
    };

    const removeCart = (idOrNombre, tipo) => {
        const updated = cartItems.filter(
            (item) =>
                !(
                    item.tipo === tipo &&
                    ((tipo === "bocadito" && item.id === idOrNombre) ||
                        (tipo === "entrada" && item.nombre === idOrNombre))
                )
        );
        setCartItems(updated);
        updateLocalStorage(updated);
    };

    const clearCart = () => {
        setCartItems([]);
        setTotalPrice(0);
        localStorage.removeItem("carritoCinePlus");
    };

    const toggleCart = () => setShowCart((prev) => !prev);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeCart,
                clearCart,
                showCart,
                toggleCart,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
