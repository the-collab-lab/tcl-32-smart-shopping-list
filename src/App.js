import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/list">List</Link>
        <Link to="/additem">Add Item</Link>
      </Router>
    </div>
  );
}

export default App;
