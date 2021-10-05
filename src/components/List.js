import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function List() {
  const showList = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().state}`);
    });
  };

  //const doc =
  // Collection:
  // {doc.map((doc, index) => (
  //   <p key={index}>{JSON.stringify(doc.data().state)}</p>
  // ))}

  return <div>Hi</div>;
}
