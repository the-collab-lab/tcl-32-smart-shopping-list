import React from 'react';
import CreateListButton from '../components/CreateListButton';
import TokenForm from '../components/TokenForm';

function Home({
  grabExistingTokenAndSaveToLocalStorage,
  createTokenAndSaveToLocalStorage,
}) {
  return (
    <div>
      <CreateListButton
        createTokenAndSaveToLocalStorage={createTokenAndSaveToLocalStorage}
      />
      <TokenForm
        grabExistingTokenAndSaveToLocalStorage={
          grabExistingTokenAndSaveToLocalStorage
        }
      />
    </div>
  );
}

export default Home;
