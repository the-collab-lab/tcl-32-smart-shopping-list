import React, { useState, useEffect } from 'react';
import CreateListButton from '../components/CreateListButton';

function Home() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const userTokenJSON = window.localStorage.getItem('userToken');

    if (userTokenJSON) {
      setUserToken(JSON.parse(userTokenJSON));
      console.log('token found');
    } else {
      console.log('token not found');
    }
  }, [userToken]);

  console.log('userToken', userToken);

  return (
    <div>
      <CreateListButton />
    </div>
  );
}

export default Home;
