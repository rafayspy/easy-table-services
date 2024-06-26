'use client'
import { useEffect, useState } from "react";
import GlobalContext from "./globalContext";
import { Toaster } from "react-hot-toast";

const dynamic= 'force-dynamic';

const GlobalContextProvider = ({ children }) => {
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (JSON.parse(localStorage.getItem("cartItems"))) {
                setCartData(JSON.parse(localStorage.getItem("cartItems")));
            }
        }
    }, []);
    // Add to cart Handler::
    const addToCartHandler = (product, keyName) => {
        if (!product) {
            return;
        }

        const existingCartItem = cartData?.find((item) => item._id === product._id);

        if (existingCartItem) {
            const updatedCartItems = cartData.map((item) =>
                item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            if (keyName !== "adminOrder") {
                localStorage.setItem(keyName, JSON.stringify(updatedCartItems));
            }
            setCartData(updatedCartItems);
        } else {
            if (keyName !== "adminOrder") {
                localStorage.setItem(
                    keyName,
                    JSON.stringify([...cartData, { ...product, quantity: 1 }])
                );
            }
            setCartData([...cartData, { ...product, quantity: 1 }]);
        }
    };

    // Remove Items form CART::
    const removeCartItem = (productId, keyName) => {
        const updatedCartItems = cartData.filter((item) => item._id !== productId);
        if (keyName !== "adminOrder") {
            localStorage.setItem(keyName, JSON.stringify(updatedCartItems));
        }
        setCartData(updatedCartItems);
    };

    const decrementCartQuantity = (
        productId,
        keyName
      ) => {
        const updatedCartItems = cartData.map((item) => {
          if (item._id === productId) {
            return {
              ...item,
              quantity: Math.max(0, item.quantity - 1), // Ensure quantity doesn't go below 0
            };
          }
          return item;
        });
        localStorage.setItem(keyName, JSON.stringify(updatedCartItems));
        setCartData(updatedCartItems);
      };

    return (
        <GlobalContext.Provider
            value={{ cartData, setCartData, removeCartItem, addToCartHandler ,decrementCartQuantity}}
        >
            <Toaster />
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider