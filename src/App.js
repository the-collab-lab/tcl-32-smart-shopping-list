import React, { useState, useEffect } from 'react';
import './App.css';
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
    setToken();
  }, [userToken]);

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
        <h1>Smart Shopping List</h1>
        <div className="linkContainerStyle">
          <NavLink activeClassName="active" className="navLink" to="/list">
            List
          </NavLink>
          <NavLink activeClassName="active" className="navLink" to="/additem">
            Add Item
          </NavLink>
        </div>

        <Switch>
          <Route exact path="/">
            {userToken ? <Redirect to="/list" /> : <Home setToken={setToken} />}
          </Route>
          <Route path="/list">
            {userToken ? <List /> : <Redirect to="/" />}
          </Route>
          <Route path="/additem">
            {userToken ? <AddItem /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
