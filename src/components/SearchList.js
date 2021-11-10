import React, { useRef, useState } from 'react';
import { normalizeValue } from './Helper';
import Item from './Item';
import DeleteItemButton from './DeleteItemButton';

export default function SearchList({ listItems, userToken }) {
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

  const filteredList = listItems.filter((item) => {
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
        aria-label="Search for Items here"
        onChange={updateSearch}
      />
      {searchedItem && (
        <button aria-label="clear search field" onClick={clearSearch}>
          X
        </button>
      )}
      <ul className="items-list">
        {filteredList.map((item) => {
          return (
            <div>
              <Item key={item.id} item={item} userToken={userToken} />
              <DeleteItemButton item={item.id} userToken={userToken} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}
