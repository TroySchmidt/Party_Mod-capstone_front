import React, { Component } from 'react';
import { Button } from 'reactstrap';
import queryString from 'query-string'


export default class CreatePlaylist extends Component {

    render() {
        return(
            <div className="App">
                <h1 className="create_PL_Header">Create a Playlist</h1>
                <input type="text" className="create_PL_search"                         placeholder="Search Music"/>
                <div className="card">
                    <section className="card-text">Search Results will hopefully        render here</section>
                </div>
                <div className="card" >The newly selected badass songs          will hopefully represented here</div>
                <Button className="createPlBtn">Save Playlist</Button>
            </div>
        )
    }
}