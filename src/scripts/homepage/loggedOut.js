import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class LoggedOut extends Component {
    render(){
        return(
            <div>
                <h1> Welcome to Party Mod! Please Sign in! </h1> <Button onClick={() => window.location = 'http://localhost:8888/login'}>Sign in</Button>
            </div>
            );
        }
}