import React from 'react';
import ItemList from '../components/ItemList';

function List() {
  const userToken = window.localStorage.getItem('userToken');

  return (
    <div className="list-view">
      <h2>Shared list token: {userToken}</h2>
      <ItemList userToken={userToken} />
    </div>
  );
}

export default List;
