import React, { Component } from 'react';



export default class Filterpl extends Component {


    render() {
        return(
            <div style={{backgroundColor: '#DD3645', height: '2.5rem', paddingTop: '.25rem'}} className="App">
                <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)} className="filterpl" placeholder="Search Playlist"/>
            </div>
        )
    }
}