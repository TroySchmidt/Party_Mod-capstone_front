import React, { Component } from 'react';



export default class Filterpl extends Component {


    render() {
        return(
            <div className="App">
                <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)} className="filterpl" placeholder="Search Playlist"/>
            </div>
        )
    }
}