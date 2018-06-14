import React, { Component } from 'react';



export default class Title extends Component {


    render() {
        return(
            <div>
                <h2 className="welcome_message">Welcome {this.props.name}</h2>
                <img style={{width: 150, height: 150}} src={this.props.profileImage} alt="Profile" />
                <h3 className="playlist_message">You currently have {this.props.numberOfPlaylist && this.props.numberOfPlaylist.length} playlists</h3>
            </div>
        )
    }
}