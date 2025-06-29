import { useState } from "react";

export const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const addToCart = (item) => {
        setCartItems((prev) => [...prev, item]);
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

    const totalPrice = cartItems.reduce((sum, item) => sum + item.precio, 0);

    return{
        cartItems,
        addToCart,
        removeCart,
        clearCart,
        showCart,
        toggleCart,
        totalPrice
    }
};
