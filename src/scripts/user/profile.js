import React, { Component } from 'react';
import { fetchAPI, getToken } from '../utils/api'
import Playlist from '../homepage/playlist'
import { Button } from 'reactstrap';



export default class Profile extends Component {
    state = {
        loggedOut: false,
        userData: {
            user:"",
            image:""
        },
        tracks: ""
      }
      componentDidMount(){
        if (!getToken()) {
          this.setState({loggedOut: true})
        }
        fetchAPI('me')
        .then(data => this.setState({userData: {
          user: {
            name: data.display_name,
            image: data.images[0].url
          }
        }
      }))
      fetchAPI('me/playlists')
    .then(playlists => this.setState({playlists}))
  }

    render() {
        let content = <div>
                    <h1> Welcome to Party Mod! Please Sign in! </h1> <Button onClick={() => window.location = 'http://localhost:8888/login'}>Sign in</Button>
        </div>;
        if (!this.state.loggedOut) {
            //and if there isn't userdata
            if (!this.state.userData.user) {
              content = <div>Loading</div>
            } else {
              //if there is userdata and loggedOut=false
              let playlistContent = <div>Loading playlists</div>
              if (this.state.playlists) {
                //looping through the playlist and grabbing the images to diplay also has the Playlist return in it
                playlistContent = this.state.playlists.items.map(playlist => {
                  let playlistImage;
                  //just grabbing te first image to display at the start of the images array
                  if (playlist.images && playlist.images.length > 0) {
                    playlistImage = playlist.images[0].url
                  }
                  return <Playlist title={playlist.name} image={playlistImage} id={playlist.id}  key={playlist.id} />
                })
              }
              content = <div className="App">
                    <h1>{this.state.userData.user.name} </h1>
                    <img style={{width: 150, height: 150}} src={this.state.userData.user.image} alt="Temppic"/>
                    <p>I am orginally form KY.  I left that one horse town to start my life as an underwater DJ. I like to Party!
                    </p>
                    <h2>
                        I currently have {playlistContent.length} Playlists
                    </h2>
                    <section>{playlistContent}</section>
                </div>
            }
        }

        return(
            <div className="App">
                {content}
            </div>
        )
    }
}