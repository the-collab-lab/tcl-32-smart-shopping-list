import React from 'react';
import CreateListButton from '../components/CreateListButton';

function Home({ setToken }) {
  return (
    <div>
      <CreateListButton setToken={setToken} />
    </div>
  );
}

export default Home;
