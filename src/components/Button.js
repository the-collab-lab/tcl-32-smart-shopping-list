import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

function Button() {
  const [state, setState] = useState(0);
  const [user, setUser] = useState([]);

  const handleSubmission = async () => {
    setState(state + 1);
    const docRef = await addDoc(collection(db, 'users'), {
      state: state,
    });
    console.log('Button was clicked =>', state);
  };

  const fetchUsers = async () => {
    //console.log(db);
    const response = await getDocs(collection(db, 'users'));

    console.log(response);
    //const data = await response.get();
    response.docs.forEach((item) => {
      setUser([...user, item.data()]);
    });
    // console.log(
    //   response.docs.forEach((item) => {
    //     setUsers([...users, item.data()]);
    //   }),
    // );
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <button onClick={handleSubmission}>Add item</button>
      {user &&
        user.map((user) => {
          return (
            <div className="user-container">
              <h4>{user.title}</h4>
              <p>{user.body}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Button;
