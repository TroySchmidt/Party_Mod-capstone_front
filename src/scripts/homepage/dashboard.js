import React, { Component } from 'react';
import Title from '../titleStuff/title'
import PlaylistBtn from '../createplaylist/createplaylistbtn'
import Filterpl from '../titleStuff/filterpl'
import Playlist from '../homepage/playlist'
import { Button } from 'reactstrap';
import { fetchAPI, getToken} from '../utils/api'
import '../../styles/playlist.css'
import InvitedPlaylist from '../playlist/invitedPlaylist';



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
            return <Playlist title={playlist.name} image={playlistImage} id={playlist.id}  key={playlist.id}/>
          })
        }
        content = <div>
          <Filterpl onTextChange={text => this.setState({filterString: text})}/>
          <Title name={this.props.user.name ? this.props.user.name: 'Party Goer!'}
              profileImage={this.props.user.image}
              numberOfPlaylist={playlistContent}/>

          <div className='playlistWrapper'>{playlistContent}</div>
          {/* <h3>Friend's Shared Playlists</h3> */}
          {/* <InvitedPlaylist/> */}
        </div>;
      }
      return content
    }
}