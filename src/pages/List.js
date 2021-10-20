import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

function List() {
  const [list, setList] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, 'list'), (snapshot) =>
        setList(snapshot.docs.map((doc) => doc.data())),
      ),
    [],
  );

  return (
    <div>
      <div>
        {list.map((list, i) => {
          return (
            <div key={i}>
              <ul>{list.itemName}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
