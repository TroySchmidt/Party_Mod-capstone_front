import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input } from 'reactstrap'
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
            if(this.state.filterString !== ""){fetchAPI('search?q=' + this.state.filterString + '&type=track%2Cartist&market=US&limit=50&offset=5').then(data => this.setState({searchResults: {
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
                fetch("https://api.spotify.com/v1/users/226eutepqguqom2353emiftmy/playlists", {
                    method: "POST",
                    headers: {
                            'Authorization': 'Bearer ' + getToken(),
                            'Content-Type':'application/json'
                        },
                    data: JSON.stringify({
                        "name": this.state.newPlaylistName,
                        "public": true
                    })
                }).then(r => r.json())
            }
        }
    }

    render() {
        let searchResultArtists
        let searchResultSongs
        if(this.state.filterString){
        searchResultSongs = this.state.searchResults.items.songs.map(results =>
            <section style={{display: 'inline-block', padding:'3rem'}} key={results.id}>

                <Card>
                    <CardImg src={results.album.images[0].url} style={{width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto'}}/>
                    <CardBody>
                        <CardTitle>Artist:</CardTitle>
                        {results.artists.map(artist =>
                            <CardText key={artist.id}>{artist.name}</CardText>
                        )}
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
                <Songs/>
                <div className="card" >
                    <h2>Search For Your Favorite Music!</h2>
                <input id='userInput' type="text" style={{width: '25%', marginLeft: 'auto', marginRight: 'auto'}} onKeyPress={this.search} className="searchMusic" placeholder="Search Music"/>
                    <section style={{display: 'inline-block', padding:'3rem'}}>
                        {searchResultSongs}
                    </section>
                </div>
            </div>
        )
    }
}