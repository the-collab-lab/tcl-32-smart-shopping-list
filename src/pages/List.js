import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

function List() {
  const [list, setList] = useState([]);

  const sharedToken = window.localStorage.getItem('userToken') || null;

  useEffect(() => {
    if (sharedToken === null) {
      alert('This token is invalid. Try again');
    }
    onSnapshot(
      query(collection(db, 'list'), where('userToken', '==', sharedToken)),
      (snapshot) => setList(snapshot.docs.map((doc) => doc.data())),
    );
  }, [sharedToken]);

  return (
    <div>
      <div>
        <h2>Shared list token: {sharedToken ? null : 'Invalid token 😔'}</h2>
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
