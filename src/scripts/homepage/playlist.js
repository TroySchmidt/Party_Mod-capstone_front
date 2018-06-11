import React, { Component } from 'react';


export default class Playlist extends Component {

    render() {

        return(
            <div>
                <h2>{this.props.title}</h2>
                <a href="/"><img style={{width: 150, height: 150}} src={this.props.image} alt="Temppic" /></a>
                <h2>{this.props.playlistName}</h2>

                <p>"x number" of Party Mods currently assigned</p>
            </div>
        )
    }
}