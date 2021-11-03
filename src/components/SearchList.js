import React, { useState } from 'react';

export default function SearchList(list) {
  const [searchedItem, setSearchedItem] = useState('');

  //function to update list of items as user enters characters
  const updateSearch = async (e) => {
    setSearchedItem(e.target.value);
  };

  const clearSearch = async (e) => {
    setSearchedItem('');
    document.getElementById('filterForm').value = '';
  };

  let fullList = list['list'];

  //function to return list of items whose normalized names contain characters entered by the user
  let filteredList = fullList.filter((item) => {
    return item.itemNameNormalize.indexOf(searchedItem.toLowerCase()) !== -1;
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
