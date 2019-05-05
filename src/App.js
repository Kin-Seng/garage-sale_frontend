import React from 'react';
import { Route, Switch, BrowserRouter} from "react-router-dom"

// CSS
import './App.css';

//Pages
import HomePage from './pages/HomePage';

//Containers
import NavBar from './containers/NavBar';
import Market from './pages/Market';


function App() {
  return (
    <>
      <NavBar />
      <br></br>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/market" component={Market} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
