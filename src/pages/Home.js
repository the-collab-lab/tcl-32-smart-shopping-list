import React from 'react';
import CreateListButton from '../components/CreateListButton';
import TokenForm from '../components/TokenForm';

function Home({
  grabExistingTokenAndSaveToLocalStorage,
  createTokenAndSaveToLocalStorage,
}) {
  return (
    // <div className="flex-1 container mx-auto h-auto">
    <div className="flex-1 flex flex-col items-center">
      <CreateListButton
        createTokenAndSaveToLocalStorage={createTokenAndSaveToLocalStorage}
      />
      <TokenForm
        grabExistingTokenAndSaveToLocalStorage={
          grabExistingTokenAndSaveToLocalStorage
        }
      />
    </div>
    // </div>
  );
}

export default Home;
