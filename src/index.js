import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import NavBar from './scripts/navBar/nav'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from './scripts/user/profile';
import registerServiceWorker from './registerServiceWorker';
import CreatePlaylist from './scripts/createplaylist/createplaylist';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentPL from './scripts/homepage/currentPL';

ReactDOM.render((
    <Router>
         <div>
             <NavBar/>
                <Route exact path="/" component={App}/>
                <Route exact path="/Profile" component={Profile}/>
                <Route exact path="/CreatePlaylist" component={CreatePlaylist}/>
                <Route exact path="/:uri" component={CurrentPL} />
        </div>
     </Router>
), document.getElementById('root'));
registerServiceWorker();
