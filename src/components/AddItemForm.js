import React, { useState } from 'react';

// function sendMessage(name, email, password, bio, job, interest) {
//   let newFormMessage = formMessage.push();
//   newFormMessage.set({
//     name: name,
//     email: email,
//     password: password,
//     bio: bio,
//     job: job,
//     Interest: interest
//   });
// }

function AddItemForm() {
  function submitItem(event) {
    event.preventDefault();
    debugger;
    console.log('value', event.target.elements);
  }

  const [item, setItem] = useState('');

  return (
    <form onSubmit={submitItem}>
      <label for="item">
        Item
        <input id="itemName" type="text" />
      </label>
      <div>
        <label>
          <input id="soon" type="radio" value="7" name="next-purchase" />
          Soon
        </label>
        <label>
          <input id="kindOfSoon" type="radio" value="14" name="next-purchase" />
          Kind of Soon
        </label>
        <label>
          <input id="notSoon" type="radio" value="30" name="next-purchase" />
          Not Soon
        </label>
      </div>
      <button id="add-item" type="submit">
        Add Item
      </button>
    </form>
  );
}

export default AddItemForm;
