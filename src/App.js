import React from 'react';
import './App.css';
// import ReadWriteFirestore from './components/ReadWriteFirestore.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import AddItem from './pages/AddItem';
// TEST
function App() {
  return (
    <div className="App">
      {/* <ReadWriteFirestore /> */}
      <Router>
        <div className="linkContainerStyle">
          <NavLink activeClassName="active" className="navLink" to="/list">
            List
          </NavLink>
          <NavLink activeClassName="active" className="navLink" to="/additem">
            Add Item
          </NavLink>
        </div>

        <Switch>
          <Route path="/home">
            <Home />
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
