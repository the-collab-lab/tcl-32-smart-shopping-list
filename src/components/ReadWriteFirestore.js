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
    setState(state + 1);
    await addDoc(collection(db, 'lists'), {
      state: state,
    });
  };

  return (
    <div>
      <button onClick={handleSubmission}> Add item </button>
      {list.map((lists, i) => {
        return (
          <div key={i}>
            <p>State: {lists.state}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ReadWriteFirestore;
