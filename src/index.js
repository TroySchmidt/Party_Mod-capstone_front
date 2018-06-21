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
import InvitedPlaylist from './scripts/playlist/invitedPlaylist';
import SharedPlaylist from './scripts/playlist/sharedPL';
import SharedPLSongs from './scripts/playlist/sharedPLSongs';

ReactDOM.render((
    <Router>
         <div>
             <NavBar/>
                <Route exact path="/" component={App}/>
                <Route exact path="/Profile" component={Profile}/>
                <Route exact path="/CreatePlaylist" component={CreatePlaylist}/>
                <Route exact path="/InvitedPlaylist" component={InvitedPlaylist}/>
                <Route exact path="/current/:uri" component={CurrentPL}/>
                <Route exact path="/shared/:uri" component={SharedPLSongs}/>
        </div>
     </Router>
), document.getElementById('root'));
registerServiceWorker();
