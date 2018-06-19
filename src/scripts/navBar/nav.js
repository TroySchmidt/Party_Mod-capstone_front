import React, { Component } from "react";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
        } from 'reactstrap';

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/" className="text-danger">Party Mod</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            {/* <NavItem>
                                <NavLink href="/Profile/" className="text-danger">Profile </NavLink>
                            </NavItem> */}

                            {/* <NavItem>
                                <NavLink href="/CreatePlaylist/" className="text-danger">Playlists</NavLink>
                            </NavItem> */}

                            <NavItem>
                                <NavLink href="https://accounts.spotify.com/en/logout"
                                className="text-danger">Logout</NavLink>
                            </NavItem>

                        </Nav>
                </Navbar>
            </div>
        );
    }
}

