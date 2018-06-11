import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class PlaylistBtn extends Component {
    render() {
        return(
            <div>
                <Button href="/CreatePlaylist/" className="createPlBtn">Create Playlist + </Button>
            </div>
        )
    }
}