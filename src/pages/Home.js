import React from 'react';
import CreateListButton from '../components/CreateListButton';
import TokenForm from '../components/TokenForm';

function Home({
  useExistingTokenAndSaveToLocalStorage,
  createTokenAndSaveToLocalStorage,
}) {
  return (
    <div>
      <CreateListButton
        createTokenAndSaveToLocalStorage={createTokenAndSaveToLocalStorage}
      />
      <TokenForm
        useExistingTokenAndSaveToLocalStorage={
          useExistingTokenAndSaveToLocalStorage
        }
      />
    </div>
  );
}

export default Home;
