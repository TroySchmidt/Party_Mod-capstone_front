import React, { Component } from 'react';
import { fetchAPI, getToken } from '../utils/api'



export default class SearchMusic extends Component {

    render() {
        return(
            <div className="App">
                <input type="text" onKeyPress={this.search} className="searchMusic" placeholder="Search Music"/>
            </div>
        )
    }
}