import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

function App() {
  const [isActive, setIsActive] = useState(false);

  const linkContainerStyle = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
  };

  function List() {
    return <div>List View</div>;
  }

  function AddItem() {
    return <div>Add Item View</div>;
  }

  return (
    <div className="App">
      <Router>
        <div style={linkContainerStyle}>
          <NavLink activeClassName="active" to="/list">
            List
          </NavLink>
          <NavLink activeClassName="active" to="/additem">
            Add Item
          </NavLink>
        </div>

        <Switch>
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
