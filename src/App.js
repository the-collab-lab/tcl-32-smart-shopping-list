import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import AddItem from './pages/AddItem';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';
// import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';
// import { setDoc, doc } from 'firebase/firestore';
// import { db } from '../src/lib/firebase';

function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    getUserToken();
  }, [userToken]);

  function createTokenAndSaveToLocalStorage(userToken) {
    // window.localStorage.setItem('userToken', getToken());
    // getUserToken();
    // submitTokenToDB();
    console.log('Creating new lists is disabled in this demo.');
  }

  // const submitTokenToDB = async () => {
  //   const token = window.localStorage.getItem('userToken');
  //   const docRef = doc(db, 'users', `${token}`);
  //   const payload = { userToken: token };
  //   await setDoc(docRef, payload);
  // };

  function grabExistingTokenAndSaveToLocalStorage(token) {
    window.localStorage.setItem('userToken', token);
    getUserToken();
  }

  function getUserToken() {
    setUserToken(window.localStorage.getItem('userToken'));
  }

  return (
    <div className="App font-sans flex flex-col h-screen bg-main-image bg-no-repeat bg-cover bg-fixed bg-center text-center justify-center">
      <Router>
        <div className="flex justify-center items-center">
          <h1 className="font-serif justify-center items-center text-white bg-maroon-flush text-3xl md:text-4xl font-bold rounded-b-md p-5 flex-row mb-2 w-full">
            ShopSmart
          </h1>
        </div>
        <Switch>
          <Route exact path="/">
            {userToken ? (
              <Redirect to="/list" />
            ) : (
              <>
                <Home
                  createTokenAndSaveToLocalStorage={
                    createTokenAndSaveToLocalStorage
                  }
                  getUserToken={getUserToken}
                  grabExistingTokenAndSaveToLocalStorage={
                    grabExistingTokenAndSaveToLocalStorage
                  }
                />
                <ArchivalNoticeModal />
              </>
            )}
          </Route>
          <Route path="/list">
            {userToken ? <List /> : <Redirect to="/" />}
          </Route>
          <Route path="/additem">
            {userToken ? <AddItem /> : <Redirect to="/" />}
          </Route>
        </Switch>
        {userToken && (
          <div className="flex flex-row fixed bottom-0 bg-white w-full md:px-20 py-2">
            <NavLink
              activeClassName="active"
              className="bg-ronchi-yellow text-white font-serif font-bold p-2 w-1/2 rounded-full hover:bg-red-damask focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2"
              to="/list"
            >
              List
            </NavLink>
            <NavLink
              activeClassName="active"
              className="bg-strong-lime-green font-semibold text-white font-serif font-bold p-2 w-1/2 rounded-full hover:bg-maroon-flush focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2"
              to="/additem"
            >
              Add Item
            </NavLink>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
