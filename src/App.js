import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const linkContainerStyle = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
  };

  const linkStyle = {
    padding: '1rem',
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
          <Link style={linkStyle} to="/list">
            List
          </Link>
          <Link style={linkStyle} to="/additem">
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
