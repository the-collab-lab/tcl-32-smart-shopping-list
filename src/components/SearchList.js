import React, { useRef, useState } from 'react';
import { normalizeValue } from './Helper';
import Item from './Item';

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

  const focusOnInput = () => {
    searchInputRef.current.focus();
  };

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
      <div className="container flex flex-col mx-auto w-full items-center justify-center">
        <ul className="items-list flex flex-col w-full">
          {filteredList.map((item) => {
            return (
              <Item
                key={item.id}
                item={item}
                userToken={userToken}
                focusOnInput={focusOnInput}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
