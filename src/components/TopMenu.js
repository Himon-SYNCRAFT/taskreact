import React from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'


class TopMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        Taskplus
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <IndexLinkContainer to="/">
                            <NavItem>Task List</NavItem>
                        </IndexLinkContainer>
                        <IndexLinkContainer to="/task/add">
                            <NavItem>Add task</NavItem>
                        </IndexLinkContainer>
                        <IndexLinkContainer to="/login">
                            <NavItem>Profile</NavItem>
                        </IndexLinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default TopMenu
