import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

function ReadWriteFirestore() {
  const [state, setState] = useState(0);
  const [user, setUser] = useState([]);

  const handleSubmission = async () => {
    setState(state + 1);
    const addUser = await addDoc(collection(db, 'users'), {
      state: state,
    });
    console.log('Button was clicked =>', state);
  };

  const getUsersCollection = collection(db, 'users');

  useEffect(() => {
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
  }, [getUsersCollection]);

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
