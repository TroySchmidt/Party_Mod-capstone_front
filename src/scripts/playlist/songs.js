import React, { Component } from 'react';
import Title from '../titleStuff/title'
import PlaylistBtn from '../createplaylist/createplaylistbtn'
import Filterpl from '../titleStuff/filterpl'
import Playlist from '../homepage/playlist'
import { Button } from 'reactstrap';
import { fetchAPI, getToken } from '../utils/api'

const accessToken = sessionStorage.getItem('token')
export default class Songs extends Component {
  state = {
    loggedOut: false,
    userData: {},
    playlists: null,
    filterString: "",
  }

  componentDidMount(){
    if (!getToken()) {
      this.setState({loggedOut: true})
    }

    //in the utils folder the fetchAPI() is just shorting the fetch call.
    fetchAPI('me')
    .then(data => this.setState({userData: {
      user: {
        name: data.display_name
      }
    }
  }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(playlistData => {
      let playlists = playlistData.items
      let trackDataPromises = playlists.map(playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
          headers: {'Authorization': 'Bearer ' + accessToken}
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
              duration: trackData.duration_ms / 1000
            }))
          })
          return playlists
        })
      return playlistsPromise
    })
    .then(playlists => this.setState({
      playlists: playlists.map(item => {
        return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: item.trackDatas
        }
      })
    }))
  }
  render() {

    return (
      <div className="App">

              {/* <ul>
                {this.state.playlists.map(song =>{
                  <li> {song.name} </li>
                  }
                )}
              </ul> */}
      </div>
    );

}}