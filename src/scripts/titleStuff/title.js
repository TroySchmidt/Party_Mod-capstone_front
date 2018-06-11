import React, { Component } from 'react';



export default class Title extends Component {


    render() {
        return(
            <div>
                <h2 className="welcome_message">Welcome {this.props.name}</h2>
                <h3 className="playlist_message">You currently have "x" playlists</h3>
            </div>
        )
    }
}