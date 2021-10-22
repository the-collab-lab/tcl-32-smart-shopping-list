import React from 'react';

export default function TokenForm({ createTokenAndSaveToLocalStorage }) {
  const handleTokenSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.sharedToken.value);
    createTokenAndSaveToLocalStorage(e.target.sharedToken.value);
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
