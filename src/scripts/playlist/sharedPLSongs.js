import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fetchAPI, saveSongs, likedSong, dislikeSong } from '../utils/api'
import { Button } from 'reactstrap';
import SearchUser from '../utils/searchUser'
import '../../styles/current.css'

const currentPL = window.location.pathname.split('/shared/')[1]
export default class SharedPLSongs extends Component {
    state = {
        user: {},
        currentPlaylist: [{
            playlistName: ""
        }],
        playlist: [{
            name: ""
        }],
        likedSongs: [],
        dislikedSongs: []
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
            })
            fetch(`http://localhost:8088/songs?playlistid=${window.location.pathname.split('/shared/')[1]}`)
            .then(r => r.json())
            .then(currentPlaylist => {
                this.setState({
                    currentPlaylist: currentPlaylist
                })
            })
            fetch(`http://localhost:8088/playlistSongs?playlistid=${window.location.pathname.split('/shared/')[1]}&like=true`)
            .then(r => r.json())
            .then(r => {
                this.setState({
                    likedSongs: r
                })
            })
            fetch(`http://localhost:8088/playlistSongs?playlistid=${window.location.pathname.split('/shared/')[1]}&like=false`)
            .then(r => r.json())
            .then(r => {
                this.setState({
                    dislikedSongs: r
                })
            })
        }


    render() {
        console.log('The State', this.state)
        return(
            <div>
                <h3>{this.state.currentPlaylist[0].playlistName}</h3>
                <ul style={{ 'list-style': 'none' }} className='songList'>
                    {this.state.currentPlaylist.map(song =>
                    <li id={song.id} className="songListItem">
                        <img style={{width: 150, height: 150}} src={song.image} alt="PlayList"/>
                            <span>
                                <ul>
                                    <li> {song.songName} </li>
                                    <li> {song.artist} </li>
                                </ul>

                            </span>
                                <Button outline color="success" size="sm" onClick= {likedSong.bind(null, currentPL, song.id, this.state.user.name)}>Like</Button>
                                <Button outline color="danger" size="sm" onClick= {dislikeSong.bind(null, currentPL, song.id, this.state.user.name)}>Dislike</Button>
                    </li>)}
                </ul>
            </div>
        )
    }

}