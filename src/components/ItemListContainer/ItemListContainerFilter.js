import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import './itemlistcontainer.css';

//import data from '../../data.json';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const ItemListContainer = () => {
  //const { id } = useParams();
  const [items, setItems] = useState([]);

  const [filter, setFilter] = useState("clothing");
  
  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, 'items');   
    
    const q = query(itemsCollection, where('category', '==', filter));

    getDocs(q).then((snapshot) => {
    setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

  }, [filter]);

  const filterOnChangeHandler = (ev) => {
    setFilter(ev.target.value);
  };

  return (
    <div>

      <select onChange={filterOnChangeHandler}>
        <option value="clothing">Men's Clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
        <option value="women">Women's Clothing</option>
      </select>

      <h2>
        <Link to="/">Catálogo</Link> /
      </h2>

      {items.length === 0 ? (
        <div>Cargando...</div>
      ) : (
        <ItemList producto={items} />
      )}

    </div>
  );
};

export default ItemListContainer;
