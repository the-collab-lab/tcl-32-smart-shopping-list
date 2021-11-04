import React, { useState } from 'react';

export default function SearchList(list) {
  const [searchedItem, setSearchedItem] = useState('');

  //function to update list of items as user enters characters
  //sets display of filtered-items to block to make it visible
  const updateSearch = async (e) => {
    setSearchedItem(e.target.value);
  };

  const clearSearch = async (e) => {
    setSearchedItem('');
  };

  //function to return list of items containing characters entered by the user
  let fullList = list['list'];

  let filteredList = fullList.filter((item) => {
    return item.itemNameNormalize.search(searchedItem.toLowerCase()) !== -1;
  });

  return (
    <div>
      Filter Items:
      <input
        type="text"
        id="filterForm"
        placeholder="Search for Items here"
        onChange={updateSearch}
      />
      {searchedItem && <button onClick={clearSearch}>X</button>}
      <div id="filtered-items">
        {filteredList.map((item) => {
          return (
            <div key={item.id}>
              <ul>{item.itemName}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
