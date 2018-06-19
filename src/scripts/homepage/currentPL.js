import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fetchAPI,saveSongs } from '../utils/api'
import { Button } from 'reactstrap';


export default class CurrentPL extends Component {
    state = {
        user: {},
        currentPlaylist: []
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
                fetchAPI(`users/${this.state.user.id}/playlists${window.location.pathname}/tracks`)
                    .then(playlistData => {
                        let playlist = playlistData.items
                        this.setState({
                            currentPlaylist: playlist.map(playlist => {
                                return {
                                    name: playlist.track.name,
                                    id: playlist.track.id,
                                    image: playlist.track.album.images[0].url,
                                    playlistid: window.location.pathname.split('/')[1]
                                }
                            })
                        })

                    })
            })
    }

    render() {
        console.log(this.state)
        return(
        <div>
            <ul style={{ 'list-style': 'none' }}>
                {this.state.currentPlaylist.map(song =>
                <li id={song.id}>
                    {song.name}
                    {saveSongs(song, this.state.currentPlaylist, this.state.user)}
                        <Button outline color="success" size="sm" onClick={() => alert('Liked!')} >Like</Button>
                        <Button outline color="danger" size="sm" onClick={() => alert('Disliked!')}>Dislike</Button>
                </li>)}
            </ul>
        </div>
        )
    }

}