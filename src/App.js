import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext';

import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';

import ItemListContainerFilter from './components/ItemListContainer/ItemListContainerFilter';


import './style.css';

export default function App() {
  return (
    <BrowserRouter>

        <CartProvider>

            <NavBar />
          

            <Routes>
              <Route exact path="/" element={<ItemListContainer />} />
              <Route exact path="/category/:id" element={<ItemListContainer />} />
              <Route exact path="/item/:id" element={<ItemDetailContainer />} />
              <Route exact path="/cart" element={<Cart />} />

              <Route exact path="/filter" element={<ItemListContainerFilter />} />

            </Routes>
      
        </CartProvider>
        
    </BrowserRouter>
  );
}
