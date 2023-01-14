import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../context/CartContext';


const CartItem = ({ item }) => {  

    const { removeItem } = useContext(CartContext);
    
    const buttonDelHandler = (ev) => {
        ev.preventDefault();
        removeItem(item.id, item.price, item.quantity);
    }

    return (

        <div>
            <img src={item.image} alt="" width="40px" />
            <strong>
            <Link to={`/item/${item.id}`}>{item.title} </Link>
            </strong>
            <br/><Link to={`/category/${item.category}`}> {item.category}</Link>

            <p>
                Precio: {item.price} | Cant.: {item.quantity} | <button onClick={buttonDelHandler}>Borrar</button>
            </p>

            <hr/>
        </div>
    );
    
  };
  
  export default CartItem;