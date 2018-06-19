import React, { Component } from 'react';
import Title from '../titleStuff/title'
import PlaylistBtn from '../createplaylist/createplaylistbtn'
import Filterpl from '../titleStuff/filterpl'
import Playlist from '../homepage/playlist'
import { Button } from 'reactstrap';
import { fetchAPI, getToken} from '../utils/api'



export default class Dashboard extends Component {
    state ={
        filterString: ""
    }

    render(){
        let content = <div>Loading</div>

      if (this.props.user) {
        //if there is userdata and loggedOut=false
        let playlistContent = <div>Loading playlists</div>
        if (this.props.playlists) {
          //looping through the playlist and adding the filter fun to it so user can search playlists
          playlistContent = this.props.playlists.items.filter(
            playlist => playlist.name.toLowerCase()
            .includes(this.state.filterString.toLowerCase())
            ).map(playlist => {
            let playlistImage;
            //just grabbing te first image to display at the start of the images array
            if (playlist.images && playlist.images.length > 0) {
              playlistImage = playlist.images[0].url
            }
            return <Playlist title={playlist.name} image={playlistImage} id={playlist.id} songs={playlist.tracks.name} key={playlist.id}/>
          })
        }
        content = <div>
          <Title name={this.props.user.name}
              profileImage={this.props.user.image}
              numberOfPlaylist={playlistContent}/>

          <Filterpl onTextChange={text => this.setState({filterString: text})}/>
          {playlistContent}

        </div>;
      }
      return content
    }
}