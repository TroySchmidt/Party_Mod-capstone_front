import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './scripts/titleStuff/title'
import PlaylistBtn from './scripts/createplaylist/createplaylistbtn'
import Filterpl from './scripts/titleStuff/filterpl'
import Playlist from './scripts/homepage/playlist'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Party Mod</h1>
        </header>
        <Title/>
        <PlaylistBtn/>
        <Filterpl/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
