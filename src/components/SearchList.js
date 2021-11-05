import React, { useRef, useState } from 'react';
import { normalizeValue } from './Helper';

export default function SearchList(listItems) {
  const [searchedItem, setSearchedItem] = useState('');
  const searchInputRef = useRef();
  //function to update list of items as user enters characters
  const updateSearch = () => {
    setSearchedItem(searchInputRef.current.value);
  };

  const clearSearch = () => {
    setSearchedItem('');
    searchInputRef.current.value = '';
  };

  //function to return list of items whose normalized names contain characters entered by the user

  const filteredList = listItems.list.filter((item) => {
    const normalizedSearch = normalizeValue(searchedItem);
    return item.itemNameNormalize.includes(normalizedSearch);
  });

  return (
    <div>
      Filter Items:
      <input
        type="text"
        ref={searchInputRef}
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
