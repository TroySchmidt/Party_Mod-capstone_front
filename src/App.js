import React, { Component } from 'react';
import './App.css';
import Title from './scripts/titleStuff/title'
import PlaylistBtn from './scripts/createplaylist/createplaylistbtn'
import Filterpl from './scripts/titleStuff/filterpl'
import Playlist from './scripts/homepage/playlist'
import NavBar from './scripts/navBar/nav'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from './scripts/user/profile';
import { Button } from 'reactstrap';
import { fetchAPI, getToken } from './scripts/utils/api'

class App extends Component {
  state = {
    loggedOut: false,
    userData: {},
    playlists: null
  }
  componentDidMount(){
    if (!getToken()) {
      this.setState({loggedOut: true})
    }
    fetchAPI('me')
    .then(data => this.setState({userData: {
      user: {
        name: data.display_name,

      }
    }
  }))

    fetchAPI('me/playlists')
    .then(playlists => this.setState({playlists}))

  }
  render() {

    let content = <Button onClick={() => window.location = 'http://localhost:8888/login'}>Sign in</Button>;

    if (!this.state.loggedOut) {
      if (!this.state.userData.user) {
        content = <div>Loading</div>
      } else {
        let playlistContent = <div>Loading playlists</div>
        if (this.state.playlists) {
          playlistContent = this.state.playlists.items.map(playlist => {
            let playlistImage;
            if (playlist.images && playlist.images.length > 0) {
              playlistImage = playlist.images[0].url
            }
            return <Playlist title={playlist.name} image={playlistImage} key={playlist.id} />
          })
        }
        content = <div>
        <Title name={this.state.userData.user.name}/>
        <PlaylistBtn/>
        <Filterpl/>
        {playlistContent}
        </div>;
      }
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
