import React, {useContext} from 'react';

import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';


import './cartwidget.css';
import cartSvg from '../../cart.svg';

const CartWidget = () => {

  const { total } = useContext(CartContext);
  
  return (
    <div className = "carrito" > <Link to='/cart'> <img src = {cartSvg} alt = "Items" /> </Link> {total.suma} | {total.cant} </div>

  );
};

export default CartWidget;