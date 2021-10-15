import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

function ReadWriteFirestore() {
  const [state, setState] = useState(0);
  const [list, setList] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, 'lists'), (snapshot) =>
        setList(snapshot.docs.map((doc) => doc.data())),
      ),
    [],
  );

  const handleSubmission = async () => {
    // setState(state + 1);
    const itemName = 'cajuiceke';
    const purchaseInterval = 30;
    const userToken = 'test token again';
    await addDoc(collection(db, 'listTest'), {
      itemName: itemName,
      purchaseInterval: purchaseInterval,
      userToken: userToken,
    });
    console.log(itemName, purchaseInterval, userToken);
  };

  return (
    <div>
      <button onClick={handleSubmission}> Test DB </button>
      {list.map((list, i) => {
        return (
          <div key={i}>
            <p>State: {list.state}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ReadWriteFirestore;
