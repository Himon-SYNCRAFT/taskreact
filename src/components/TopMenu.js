import React from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import AuthActions from '../actions/AuthActions'


class TopMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onClickLogOut = this.onClickLogOut.bind(this)
    }

    onClickLogOut(event) {
        event.preventDefault()
        AuthActions.logout()
    }

    render() {
        const authLinks = this.props.isLogged ? (
            <NavItem onClick={this.onClickLogOut}>Log Out ({this.props.user.name})</NavItem>
        ) : (
            <IndexLinkContainer to="/login">
                <NavItem>Log In</NavItem>
            </IndexLinkContainer>
        )

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
                        {authLinks}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

TopMenu.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired
    })
}


export default TopMenu
