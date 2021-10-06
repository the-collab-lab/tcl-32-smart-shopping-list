import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

function Button() {
  const [state, setState] = useState(0);

  const handleSubmission = async () => {
    setState(state + 1);
    const docRef = await addDoc(collection(db, 'users'), {
      state: state,
    });
    console.log('Document written with ID: ', docRef.id, '\n State:', state);
  };

  return (
    <div>
      <button onClick={handleSubmission}>Add item</button>
    </div>
  );
}

export default Button;
