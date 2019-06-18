import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Reader from './Reader';
import About from './About';

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/reader" exact component={Reader} />
      <Route path="/about" exact component={About} />
    </Router>
  );
}

export default AppRouter;
