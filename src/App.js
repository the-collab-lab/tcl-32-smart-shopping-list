import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [isActive, setIsActive] = useState(false);

  const linkContainerStyle = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
  };

  const linkStyle = {
    padding: '1rem',
  };

  const linkIsActiveStyle = {
    padding: '1rem',
    fontWeight: '700',
  };

  function List() {
    return <div>List View</div>;
  }

  function AddItem() {
    return <div>Add Item View</div>;
  }

  function handleLinkClick() {
    setIsActive(!isActive);
  }

  return (
    <div className="App">
      <Router>
        <div style={linkContainerStyle}>
          <Link
            onClick={handleLinkClick}
            style={isActive ? linkIsActiveStyle : linkStyle}
            to="/list"
          >
            List
          </Link>
          <Link
            onClick={handleLinkClick}
            style={!isActive ? linkIsActiveStyle : linkStyle}
            to="/additem"
          >
            Add Item
          </Link>
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
