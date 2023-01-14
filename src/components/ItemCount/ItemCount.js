import React, { useState, useContext } from 'react';

import { CartContext } from '../../context/CartContext';

const ItemCount = () => {
  const [contador, setContador] = useState(1);
  
  const { addNumProd } = useContext(CartContext);

  const buttonContadorClickMas = () => {
    setContador(contador + 1);
    addNumProd(contador + 1);
  };
  const buttonContadorClickMenos = () => {
   // const st = (contador > 1) ? setContador(contador - 1) : contador;
    if (contador > 1) {
      setContador(contador - 1);
      addNumProd(contador - 1);
    }
  };

  return (
    <div>
      <button onClick={buttonContadorClickMas}>+</button>
       <strong>{contador}</strong>
      <button onClick={buttonContadorClickMenos}>-</button>
    </div>
  );

};

export default ItemCount;