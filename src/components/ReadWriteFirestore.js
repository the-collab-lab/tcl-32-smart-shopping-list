import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

function ReadWriteFirestore(props) {
  const [state, setState] = useState(0);
  const [user, setUser] = useState([]);

  // Loads current snapshot of data after first page load
  useEffect(() => {
    const getUsersCollection = collection(db, 'users');

    const getUsers = async () => {
      const data = await getDocs(getUsersCollection);
      setUser(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      );
    };

    getUsers();
  }, []);

  // Loads updated snapshot in console after handleSubmission runs
  const q = query(collection(db, 'users'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data().state);
    });
    // unsubscribe();
    console.log('Current users list: ', users.join(', '));
  });

  const handleSubmission = async () => {
    setState(state + 1);
    await addDoc(collection(db, 'users'), {
      state: state,
    });
  };

  return (
    <div>
      <button onClick={handleSubmission}>Add item</button>

      {user.map((user, i) => {
        return (
          <div key={i}>
            <p>
              State: {user.state}, Id: {user.id}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ReadWriteFirestore;
