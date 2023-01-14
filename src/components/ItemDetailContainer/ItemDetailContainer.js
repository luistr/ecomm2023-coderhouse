import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';

import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { CartContext } from '../../context/CartContext';


const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);

  const { numProd, addItem } = useContext(CartContext);

  useEffect(() => {
    const db = getFirestore();
    const itemRef = doc(db, 'items', id);
    getDoc(itemRef).then((snapshot) => {
      if (snapshot.exists()) {
        setItem({ id: snapshot.id, ...snapshot.data() });
      }
    });
  }, [id]);

  // Agrega Item al carrito
  const buttonAddHandler = (ev) => {
    ev.preventDefault();
    addItem( 
      {
        id: item?.id,
        title: item?.title,
        price: item?.price,
        category: item?.category,
        description: item?.description,
        quantity: numProd,
        image: item?.image
      }
    );
  }

  return (
    <div>
      <p><Link to='/'>Home</Link> / <Link to={`/category/${item?.category}`}> {item?.category}</Link></p>

      <h2>{ !item.title ? "Cargando..." : item.title }</h2>
      <p>Precio: { !item.price ? "Cargando..." : item.price }</p>
      <p>{ !item.description ? "Cargando..." : item.description }</p>

      <ItemCount />
      
      <p><button onClick={buttonAddHandler}>Agregar</button></p>
      <p><img src={ !item.image ? "Cargando..." : item.image } alt="" width="200px" /></p>
    </div>
  );
};

export default ItemDetailContainer;
