import React from 'react';
import ItemList from '../components/ItemList';

function List() {
  const userToken = window.localStorage.getItem('userToken');

  return (
    <div>
      <div className="flex justify-center items-center">
        <h2 className="flex text-white bg-red-damask border-0 text-xl font-bold items-center justify-center rounded-md mt-5 px-3 flex flex-row mb-2 w-9/12 md:w-2/4 p-1 space-x-0">
          Sharable List token: {userToken}
        </h2>
      </div>
      <ItemList userToken={userToken} />
    </div>
  );
}

export default List;
