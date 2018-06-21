import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fetchAPI, saveSongs } from '../utils/api'
import { Button } from 'reactstrap';
import SearchUser from '../utils/searchUser'
import '../../styles/current.css'

export default class CurrentPL extends Component {
    state = {
        user: {},
        currentPlaylist: [],
        playlist: [{
            name: ""
        }]
    }
    componentDidMount() {

        fetchAPI('me')
            .then(data => {
                const user = {
                    name: data.display_name,
                    image: data.images[0].url,
                    email: data.email,
                    id: data.id
                }
                this.setState({
                    user
                });
                fetchAPI(`users/${this.state.user.id}/playlists/${window.location.pathname.split('/current/')[1]}/tracks`)
                    .then(playlistData => {
                        let playlist = playlistData.items
                        this.setState({
                            currentPlaylist: playlist.map(playlist => {
                                return {
                                    name: playlist.track.name,
                                    id: playlist.track.id,
                                    image: playlist.track.album.images[0].url,
                                    playlistid: window.location.pathname.split('/current/')[1],
                                    artist: playlist.track.artists[0].name
                                }
                            })
                        })

                    })
            })
            fetch(`http://localhost:8088/playlist?id=${window.location.pathname.split('/current/')[1]}`)
            .then(r => r.json())
            .then(playlist =>
                this.setState({
                    playlist: playlist
                }))
    }


    render() {
        console.log('The State', this.state)
        return(
        <div>
            <section className="searchInput">
                <h5>Share Playlist</h5>
                <SearchUser  playlistid={window.location.pathname.split('/current/')[1]} user={this.state.user.email}/>
            </section>
            <h3>{this.state.playlist[0].name}</h3>
            <ul style={{ 'list-style': 'none' }} className='songList'>
                {this.state.currentPlaylist.map(song =>
                <li id={song.id} className="songListItem">
                <img style={{width: 150, height: 150}} src={song.image} alt="PlayList"/>
                    <span>
                        <ul>
                            <li> {song.name} </li>
                            <li> {song.artist} </li>
                        </ul>
                    </span>
                    {saveSongs(song, this.state.playlist[0], this.state.user)}
                        <Button outline color="success" size="sm" onClick={() => alert('Keeping this tune!')} >Keep</Button>
                        <Button outline color="danger" size="sm" onClick={() => alert('I did not like that song anyways')}>Discard</Button>
                </li>)}
            </ul>
        </div>
        )
    }

}