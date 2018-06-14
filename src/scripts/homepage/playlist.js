import React, { Component } from 'react';


export default class Playlist extends Component {


    render() {
        let showPlaylist;
        return(
            <div id={this.props.id} style={{display: 'inline-block', padding:'3rem'}}>
                <h2>{this.props.title}</h2>
                <button className="playlist_images" onClick={showPlaylist = (e) => {
                        e = this.props.id
                        console.log(e)
                    }
                }><img style={{width: 150, height: 150}} src={this.props.image} alt="PlayList" /></button>


                <section>
                    <ul>
                        {this.props.songs}
                    </ul></section>
            </div>
        )
    }
}