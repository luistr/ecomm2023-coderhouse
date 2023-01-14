import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import './itemlistcontainer.css';

//import data from '../../data.json';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const ItemListContainer = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  const [filter, setFilter] = useState(id);

  //const fetchUrl = 'https://fakestoreapi.com/products';
  //const fetchUrlId = id ? fetchUrl + '/category/' + id : fetchUrl;
  
  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, 'items');

    if (!id) {

      getDocs(itemsCollection).then((snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(items);
      });
    
    }else{
    
      const q = query(itemsCollection, where('category', '==', filter));

      getDocs(q).then((snapshot) => {
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }

  }, [filter]);

  const filterOnChangeHandler = () => {
    setFilter(id);
  };

  return (
    <div>
      
      <h2>
        <Link to="/">Catálogo</Link> / <Link to="#" onClick={filterOnChangeHandler}>{id}</Link>
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
