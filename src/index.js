import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import queryString from 'query-string'
import Title from './scripts/titleStuff/title'
import PlaylistBtn from './scripts/createplaylist/createplaylistbtn'
import Filterpl from './scripts/titleStuff/filterpl'
import Playlist from './scripts/homepage/playlist'
import NavBar from './scripts/navBar/nav'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from './scripts/user/profile';
import registerServiceWorker from './registerServiceWorker';
import CreatePlaylist from './scripts/createplaylist/createplaylist';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
    <Router>
         <div>
             <NavBar/>
                <Route exact path="/" component={App}/>
                <Route exact path="/Profile" component={Profile}/>
                <Route exact path="/CreatePlaylist" component={CreatePlaylist}/>
        </div>
     </Router>
), document.getElementById('root'));
registerServiceWorker();
