import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/create';
import Read from './pages/Read';
import Delete from './pages/Delete';
import Update from './pages/update';
import History from './pages/history';

  
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/Create' exact component={Home} />
        <Route path='/Read' component={Read} />
        <Route path='/Delete' component={Delete} />
        <Route path='/Update' component={Update} />
        <Route path='/History' component={History} />

      </Switch>
    </Router>
  );
}
  
export default App;