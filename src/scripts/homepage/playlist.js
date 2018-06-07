import React, { Component } from 'react';


export default class Playlist extends Component {
    render() {
        return(
            <div>
                <img style={{width: 150, height: 150}} src={require("/Users/jake/workspace/capstone_front/partymod/src/imgs/frontend_tempt_pic.png")} alt="Temptpic"/>
                <h2>Name of Playlist</h2>
                <p>"x number" of Party Mods currently assigned</p>
            </div>
        )
    }
}