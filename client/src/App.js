import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Settimana from './components/settimana/settimana.js'

import AddTutorial from "./components/add-tutorial.component"
import TutorialsList from "./components/tutorials-list.component"
import Tutorial from "./components/tutorial.component"

function App() {
  return (
    <div>
      <ul className="background">
        <li></li>
        <li className="star2"></li>
      </ul>

      <div className="citta">
        <span>Roma</span>
      </div>
      {/* <div className="main">
        <div className="settimana">
        </div>
      </div> */}
  </div>

    // <div>
    //     <nav className="navbar navbar-expand navbar-dark bg-dark">
    //       <a href="/tutorials" className="navbar-brand">
    //         bezKoder
    //       </a>
    //       <div className="navbar-nav mr-auto">
    //         <li className="nav-item">
    //           <Link to={"/tutorials"} className="nav-link">
    //             Tutorials
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link to={"/add"} className="nav-link">
    //             Add
    //           </Link>
    //         </li>
    //       </div>
    //     </nav>

    //         <div className="container mt-3">
    //           <Switch>
    //             <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
    //             <Route exact path="/add" component={AddTutorial} />
    //             <Route path="/tutorials/:id" component={Tutorial} />
    //           </Switch>
    //         </div>
    //      </div>
  );
}

export default App;
