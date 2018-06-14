import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap'
import { fetchAPI, getToken } from '../utils/api'
import Songs from '../playlist/songs'
import SearchMusic from '../createplaylist/searchmusic'





export default class CreatePlaylist extends Component {

    state = {
        filterString: null,
        searchResults: {
            items:[]
        },
        newPlaylistName: ""
    }

    search = (e) => {
        if(e.charCode === 13) {
            this.state.filterString = document.getElementById('userInput').value
            if(this.state.filterString !== ""){fetchAPI('search?q=' + this.state.filterString + '&type=track%2Cartist&market=US&limit=10&offset=5').then(data => this.setState({searchResults: {
                items: {
                    artists: data.artists.items,
                    songs: data.tracks.items
                }
            }}))}
    }}

    createNewPlaylist = (e) => {
        if(e.charCode === 13){
            this.state.newPlaylistName = document.getElementById('newPlaylistName').value
            if(this.state.newPlaylistName !== ""){
                fetch("https://spotify.com/v1/me/playlists", {
                    method: 'POST',
                    headers: {'Authorization': 'Bearer ' + getToken()},
                    body: JSON.stringify({
                        "name": this.state.newPlaylistName,
                        "description": 'Jake Rules',
                        "public": false
                    })
                }).then(r => r.json())
                .then(e => {
                    this.setState({newPlaylistName: e})
                })
            }
        }
    }



    render() {
        let searchResultArtists
        let searchResultSongs
        if(this.state.filterString){
        searchResultSongs = this.state.searchResults.items.songs.map(results =>
            <section style={{display: 'inline-block', padding:'3rem'}}>
                <Card>
                    <CardImg src={results.album.images[0].url} style={{width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto'}}/>
                    <CardBody>
                        <CardTitle>Album Name:</CardTitle>
                            <CardText>{results.album.name}</CardText>
                        <CardTitle>Song Name:</CardTitle>
                            <CardText>{results.name}</CardText>
                            <Button className="addToPlaylist">add</Button>
                    </CardBody>
                </Card>
            </section>
            )
        }
        return(
            <div className="App">
                <h1 className="create_PL_Header">Create a Playlist</h1>
                <input id="newPlaylistName" type="text" className="newPlaylistNameInput" onKeyPress={this.createNewPlaylist} placeholder="New Playlist Name"/>
                <input id='userInput' type="text" onKeyPress={this.search} className="searchMusic" placeholder="Search Music"/>
                <div className="card" >
                    <h2>Search Results</h2>
                    <section style={{display: 'inline-block', padding:'3rem'}}>
                        {searchResultSongs}
                    </section>
                </div>
                <div className="card" >The newly selected badass songs will hopefully represented here</div>
            </div>
        )
    }
}