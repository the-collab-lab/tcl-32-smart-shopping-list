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
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center text-lg font-bold text-gray-500 bg-white p-2 w-96 rounded-md mt-5 mb-2 border-2 py-1 px-3">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search for Items here"
            aria-label="Search for Items here"
            onChange={updateSearch}
            className="flex-grow outline-none text-gray-600 focus:text-blue-600"
          />
          {searchedItem ? (
            <button aria-label="clear search field" onClick={clearSearch}>
              X
            </button>
          ) : (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 hover:text-blue-400 transition duration-100 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
      <div>
        <div className="container flex flex-col mx-auto w-full items-center justify-center">
          <ul className="items-list flex flex-col items-center w-full">
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
    </div>
  );
}
