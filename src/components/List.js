import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function List() {
  const showList = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      return doc.data().state;
    });
  };

  return <div>{showList().state}</div>;
}
