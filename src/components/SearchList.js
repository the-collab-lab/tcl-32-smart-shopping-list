import React, { useState } from 'react';

export default function SearchList(list) {
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);

  //function to update list of items as user enters characters
  //sets display of filtered-items to block to make it visible
  const updateSearch = async (e) => {
    setDisplay(true);
    setSearch(e.target.value);
  };

  //function to return list of items containing characters entered by the user
  let filteredList = list['list'].filter((item) => {
    return item.itemName.toLowerCase().search(search.toLowerCase()) !== -1;
  });

  return (
    <div>
      Filter Items:
      <input type="text" onChange={updateSearch} />
      <div id="filtered-items" style={{ display: display ? 'block' : 'none' }}>
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
