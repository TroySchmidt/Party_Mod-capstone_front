import React, { Component } from 'react';
import { fetchAPI } from '../utils/api'
import Playlist from '../homepage/playlist';
import { Button } from 'reactstrap';
import '../../styles/invitedPlaylist.css'
import SharedPlaylist from './sharedPL';
import '../../styles/playlist.css'

export default class InvitedPlaylist extends Component {
    state ={
        playlist: [],
        allPlaylists: []
    }


    componentDidMount(){
        fetchAPI('me')
            .then(data => {
                const user = {
                    name: data.display_name,
                    // image: data.images[0].url,
                    email: data.email,
                    id: data.id
                }
                fetch(`http://localhost:8088/playlistInvitedFriends?invitedFriendid=${user.email}`)
                .then(r => r.json())
                .then(r => {
                    const playlistPromises = []

                    r.map(invitedPL => {
                        invitedPL = {
                            id: invitedPL.id,
                            invitedFriendid: invitedPL.id,
                            invitingUser: invitedPL.invitingUser,
                            playlistid: invitedPL.playlistid

                        }
                        playlistPromises.push(fetch(`http://localhost:8088/songs?playlistid=${invitedPL.playlistid}`)
                        .then(r => r.json()))

                    })
                    Promise.all(playlistPromises)
                    .then(r => this.setState({
                            playlist: r
                        })
                    )
                    .then(r => console.log(r))
                })
            })
            fetch('http://localhost:8088/playlist')
            .then(r => r.json())
            .then(r => this.setState({
                allPlaylists: r
            }))
    }

    render() {
        console.log('LOOK', this.state)
        let content =
        <div>
        <h4 style={{textAlign: 'center', backgroundColor: '#DD3645', height: '2.5rem', paddingTop: '.25rem'}}>Your Friends have Invited You to Judge these Playlists:</h4>
            <div className="playlistWrapper">
                     {this.state.playlist.map(eachPL =>{
                     return(
                         <SharedPlaylist title={eachPL[0].playlistName} image={eachPL[0].image} id={eachPL[0].playlistid} key={eachPL[0].id}/>
                         )
                         })}
            </div>
        </div>

    return content


    }
}