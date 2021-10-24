import React from 'react';
import { db } from '../lib/firebase';
// import { collection, where } from "firebase/firestore";

export default function TokenForm({ createTokenAndSaveToLocalStorage }) {
  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    // const token = e.target.sharedToken.value

    db.collection('list')
      .where('userToken', '==', 'sharedToken')
      .get()
      .then((querySnapshot) => {
        console.log('querySnapshot', querySnapshot);
        // querySnapshot.forEach(doc =>{
        //     console.log(doc.data()) // or do something else with the data
        // })
        createTokenAndSaveToLocalStorage(e.target.sharedToken.value);
      })
      .catch((error) => {
        alert('Error: This token does not exist', error);
      });

    console.log(e.target.sharedToken.value);
    // createTokenAndSaveToLocalStorage(e.target.sharedToken.value);
  };

  return (
    <form onSubmit={handleTokenSubmit}>
      <label>
        <input placeholder="Enter Token Here" type="text" id="sharedToken" />
      </label>
      <button id="addToken" type="submit" className="addTokenSubmitButton">
        Add Token
      </button>
    </form>
  );
}
