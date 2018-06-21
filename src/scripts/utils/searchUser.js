import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ininviteFriendtoPL, inviteFriendtoPL } from '../utils/api'
import '../../styles/searchUser.css'


export default class SearchUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchText: "",
            searchResults: [],
            modal: false
        }
    this.toggle = this.toggle.bind(this)
}


    toggle(){
        this.setState({
            modal: !this.state.modal
        })
    }

    searchUser = (e) => {
        if(e.charCode === 13) {
            this.state.searchText = document.getElementById('searchUser').value
            if(this.state.searchText !== ""){
                fetch('http://localhost:8088/user?email=' + this.state.searchText)
                .then(r => r.json())
                .then(searchResults => this.setState({
                    searchResults: searchResults,
                    modal: !this.state.modal
                }))
            }
        }
    }



    render() {
        console.log('look here', this.state)
        let userSearchResults
        if(this.state.searchResults){
            userSearchResults = this.state.searchResults.map(user =>
                <section id={user.id} className="searchResults">
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Search Results</ModalHeader>
                            <ModalBody>
                                <img src={user.image} style={{width: 150, height: 150}}/>
                                <ul style={{ 'list-style': 'none' }}>
                                    <li>Name: {user.displayName}</li>
                                    <li>Email: {user.email}</li>
                                </ul>
                                </ModalBody>
                        <ModalFooter>
                            <Button color="danger" style={{width: 150}} onClick={inviteFriendtoPL(this.props.playlistid, this.props.user, user.email)}>Invite {user.displayName}</Button>
                        </ModalFooter>
                    </Modal>
                </section>)
        }
        return(
            <div className="searchInput">
            <input id="searchUser"  onKeyPress={this.searchUser} placeholder="Search Email"/>
            {userSearchResults}
            </div>
        )
    }
}