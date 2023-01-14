import React from 'react';
import Item from '../Item/Item';

const ItemList = ({producto}) => {

  const listProd = producto?.map( prod => 

    <Item item={prod} key={prod.id} />

  );
  return (listProd);
};

export default ItemList;