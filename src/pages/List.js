import React from 'react';
import ItemList from '../components/ItemList';

function List() {
  const userToken = window.localStorage.getItem('userToken');

  return (
    <div className="list-view">
      <h2 className="flex text-white bg-red-500 border-0 justify-center">
        List token: {userToken}
      </h2>
      <ItemList userToken={userToken} />
    </div>
  );
}

export default List;
