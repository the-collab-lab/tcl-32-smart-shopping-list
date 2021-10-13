import React, { useState, useEffect } from 'react';
import './App.css';
// import ReadWriteFirestore from './components/ReadWriteFirestore.js';
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

function App() {
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

  function setToken() {
    setUserToken(window.localStorage.getItem('userToken'));
  }

  return (
    <div className="App">
      <Router>
        {userToken && (
          <div className="linkContainerStyle">
            <NavLink activeClassName="active" className="navLink" to="/list">
              List
            </NavLink>
            <NavLink activeClassName="active" className="navLink" to="/additem">
              Add Item
            </NavLink>
          </div>
        )}

        <Switch>
          <Route exact path="/">
            {userToken ? <Redirect to="/list" /> : <Home setToken={setToken} />}
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/additem">
            <AddItem />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
