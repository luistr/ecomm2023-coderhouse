import React, { useState } from 'react';

const CartContext = React.createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState ([]);
    const [cartFb, setCartFb] = useState ([]);
    const [total, setTotal] = useState ({suma:0, cant:0})
    const [numProd, setNumProd] = useState (1);

    // Agrega al carrito y calcula valores según precio y cantidad
    const addItem = (obj) => {

        const dbFirebase = { id: obj.id, title: obj.title, price: obj.price, quantity: obj.quantity };

        setCart([...cart, obj]);
        setCartFb([...cartFb, dbFirebase]);
    
        const {suma, cant} = total;
        let sumaProd = obj.price * obj.quantity;
        setTotal({ ...total, suma: suma+sumaProd, cant: cant+obj.quantity });
    };
    
    // N° productos
    const addNumProd = (obj) => {
        setNumProd(obj);
    };
    
    // Borra item seleccionado y recalcula valores
    const removeItem = (idItem, prItem, caItem) => {
        setCart(
            cart.filter(a =>
                idItem !== a.id
            )
        )

        const {suma, cant} = total;
        let sumaProd = (cant===0)? 0 : suma-(prItem * caItem); 
        setTotal({ ...total, suma: sumaProd, cant: cant-caItem });
    }

    // Limpia carrito
    const clear = () => {
        setCart([]);
        setTotal({suma:0, cant:0});
    };

    //id => true|false
    const isIntCart = () => {};

    return (
        <CartContext.Provider value={{ cart, cartFb, setCart, total, addItem, removeItem, clear, numProd, addNumProd}}>
            {children}
        </CartContext.Provider>
    );

};

export { CartContext, CartProvider };