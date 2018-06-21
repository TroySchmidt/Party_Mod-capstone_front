import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../styles/playlist.css'




export default class SharedPlaylist extends Component {

    render() {
        let showPlaylist;
        return(
            <div id={this.props.id} className="playlist_div">
                <h2>{this.props.title}</h2>
                <Link className="playlist_images" to={`/shared/${this.props.id}`}><img style={{width: 150, height: 150}} src={this.props.image} alt="PlayList" /></Link>
            </div>
        )
    }
}