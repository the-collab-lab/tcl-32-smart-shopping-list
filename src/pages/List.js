import React from 'react';
import ItemList from '../components/ItemList';
import '../components/AddItemForm.css';
import '../components/Item.css';

function List() {
  const userToken = window.localStorage.getItem('userToken');

  return (
    <div className="list-view">
      <h2>Shared list token: {userToken}</h2>
      <ItemList />
    </div>
  );
}

export default List;
