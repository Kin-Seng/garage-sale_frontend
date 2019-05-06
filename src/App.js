import React from 'react';
import { Route, Switch, BrowserRouter} from "react-router-dom"

// CSS
import './App.css';

//Pages
import HomePage from './pages/HomePage';
import PostItem from './pages/PostItem';
import mySellingPost from './pages/mySellingPost';
import Payment from './pages/Payment';

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
          <Route exact path="/mySellingPost/:id" component={mySellingPost} />
          <Route exact path="/postItem" component={PostItem} />
          <Route exact path="/payment" component={Payment} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
