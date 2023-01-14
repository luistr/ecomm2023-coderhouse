import React, { useContext,useState } from 'react';
import CartItem from '../CartItem/CartIttem';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


import { CartContext } from '../../context/CartContext';

const Cart = () => {

    const { cart, cartFb, total, clear } = useContext(CartContext);

    const [id, setId] = useState();
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
  
    // Lista de prods agregados al carrito
    const listProd = cart?.map( prod => 
        <CartItem item={prod} key={prod.id} />,
    );

    // Limpia carrito
    const buttonClearHandler = (ev) => {
        ev.preventDefault();
        clear();
    }

    // Formato para Firebase
    const order = {
      buyer: form,
      items: cartFb,
      total: total.suma
    };

    // Envía a Base de datos, limpia carrito y retorna ID del registro
    const submitHandler = (ev) => {
        ev.preventDefault();
    
        const db = getFirestore();
        const formsCollection = collection(db, 'orders');
    
        addDoc(formsCollection, order).then((snapshot) => {
          setForm({ name: '', email: '', phone: '' });
          clear();
          setId( snapshot.id );
        });
    };
    
      const changeHandler = (ev) => {
        const { value, name } = ev.target;
        setForm({ ...form, [name]: value });
      };

    return (
        <>
        <h2>Carrito</h2>
        
        {listProd}
        Total: {total.suma} | N° Prods.: {total.cant} <button onClick={buttonClearHandler}>Borrar carrito</button>
        
        <hr/><hr/>

        <div>
        {typeof id !== 'undefined' ? (
          <div>
            <p>¡Gracias por su compra! Su pedido se ha enviado</p>
            <p>El código es: {id}</p>
          </div>
        ) : (
          
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="name">Nombre</label>
              <input name="name" id="name" value={form.name} onChange={changeHandler} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={form.email} onChange={changeHandler} />
            </div>
            <div>
              <label htmlFor="phone">Teléfono</label>
              <input type="phone" name="phone" id="phone" value={form.phone} onChange={changeHandler} />
            </div>
            <button>Enviar pedido</button>
          </form>
        )}
        </div>
        </>
    );

};

export default Cart;