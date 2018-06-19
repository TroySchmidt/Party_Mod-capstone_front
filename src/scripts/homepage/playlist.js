import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Playlist extends Component {

    render() {
        let showPlaylist;
        return(
            <div id={this.props.id} style={{display: 'inline-block', padding:'3rem'}}>
                <h2>{this.props.title}</h2>
                <Link className="playlist_images" to={`/${this.props.id}`}><img style={{width: 150, height: 150}} src={this.props.image} alt="PlayList" /></Link>
            </div>
        )
    }
}