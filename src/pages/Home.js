import React from 'react';
import CreateListButton from '../components/CreateListButton';
import TokenForm from '../components/TokenForm';

function Home({ getUserToken, createTokenAndSaveToLocalStorage }) {
  return (
    <div>
      <CreateListButton getUserToken={getUserToken} />
      <TokenForm
        createTokenAndSaveToLocalStorage={createTokenAndSaveToLocalStorage}
      />
    </div>
  );
}

export default Home;
