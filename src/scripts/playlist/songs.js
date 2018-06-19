import React, { Component } from 'react';
import Title from '../titleStuff/title'
import PlaylistBtn from '../createplaylist/createplaylistbtn'
import Filterpl from '../titleStuff/filterpl'
import Playlist from '../homepage/playlist'
import { Button } from 'reactstrap';
import { fetchAPI, getToken, saveSongs } from '../utils/api'
import { like } from '../utils/api'

const accessToken = sessionStorage.getItem('token')
export default class Songs extends Component {
  state = {
    loggedOut: false,
    userData: {
      user: {
        name: "",
        image: "",
        email: ""
      }
    },
    playlists: [{
      name: "",
      songs: [{ name: "" }],
      imageUrl: "",
      id: ""
    }],
    filterString: "",
  }

  componentDidMount() {
    if (!getToken()) {
      this.setState({ loggedOut: true })
    }

    //in the utils folder the fetchAPI() is just shorting the fetch call.
    fetchAPI('me')
      .then(data => this.setState({
        userData: {
          user: {
            name: data.display_name,
            id: data.id,
            email: data.email
          }
        }
      }))
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
          })
          let trackDataPromise = responsePromise
            .then(response => response.json())
            return trackDataPromise
        })
        let allTracksDataPromises =
          Promise.all(trackDataPromises)

        let playlistsPromise = allTracksDataPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                name: trackData.name,
                id: trackData.id
              }))
          })
          return playlists

        })
        return playlistsPromise
      })
      .then(playlists => {
        this.setState({
          playlists: playlists.map(item => {
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              songs: item.trackDatas,
              id: item.id
            }
          })
        })
      })
  }


  playlistSongs = function () {
    return (
      this.state.playlists.map(playlist => {
        const name = playlist.name
        const songNames = []
        const imageUrl = playlist.imageUrl
        const playlistid = playlist.id
        playlist.songs.forEach(song => {
          songNames.push(song.name)
        })


        // saveSongs(playlist.songs, playlist, this.state.userData.user)

        return (<div style={{ display: 'inline-block', padding: '3rem' }}>
          <h4>{name}</h4>
          <img style={{ width: 150, height: 150 }} src={imageUrl} alt="Playlist" />
          <ul style={{ 'list-style': 'none' }}>{songNames.map(song =>
            <li>{song}
              <Button outline color="success" size="sm" onClick={() => alert('Liked!')} >Like</Button>
              <Button outline color="danger" size="sm" onClick={() => alert('Disliked!')}>Dislike</Button></li>)}
          </ul>
        </div>)
      })
    )
  }.bind(this)

  render() {
    console.log(this.state.playlists)
    return (
      <div className="App">
        {this.playlistSongs()}
      </div>
    );

  }
}