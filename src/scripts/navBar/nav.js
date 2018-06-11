import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/" className="text-danger">Party Mod</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/Profile/" className="text-danger">Profile </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink href="/CreatePlaylist/" className="text-danger">Create Playlist</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink href="/" className="text-danger">Logout</NavLink>
                            </NavItem>

                        </Nav>
                </Navbar>
            </div>
        );
    }
}

