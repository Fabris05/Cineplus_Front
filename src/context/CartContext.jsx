"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);


    useEffect(() => {
        const storedCart = localStorage.getItem("cineplus_cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cineplus_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (newItem) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === newItem.id
            );
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id
                        ? {
                              ...item,
                              cantidad: item.cantidad + newItem.cantidad,
                          }
                        : item
                );
            } else {
                return [...prevItems, newItem];
            }
        });
    };

    const removeCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => {
        setShowCart((prev) => !prev);
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.precio * (item.cantidad || 1),
        0
    );

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
