import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import Estimates from './estimates';
import Home from './home'
const App = () =>(
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/estimates" component= {Estimates} />
      </Switch>    
    </Router>
  );

export default App;
