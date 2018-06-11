import React, { Component } from 'react';
import queryString from 'query-string'


export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
          userData: {}
        }
    }
        componentDidMount(){
            let parsed = queryString.parse(window.location.search)
            let accessToken = parsed.access_token

            fetch('https://api.spotify.com/v1/me', {
                headers: {'Authorization': 'Bearer ' + accessToken}
                }).then(response => response.json())
                .then(data => this.setState({userData: {
                    user: {
                    name: data.display_name,
                    }
                }
            }))
        }

    render() {
        return(
            <div className="App">
                <h1>UserName</h1>
                <img style={{width: 150, height: 150}} src={require("/Users/jake/workspace/capstone_front/partymod/src/imgs/frontend_tempt_pic.png")} alt="Temptpic"/>
                <p>Steve Holt! I'm afraid I just blue myself. No, I did not kill        Kitty. However, I am going to oblige and answer the nice           officer's questions because I am an honest man with no             secrets to hide. Well, what do you expect, mother?
                </p>
                <p>
                    # of playlists
                </p>
                <p></p>
            </div>
        )
    }
}