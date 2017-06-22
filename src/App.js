import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { TaskList } from './components/TaskList'
import LoginForm from './components/LoginForm'
import TopMenu from './components/TopMenu'
import TaskForm from './components/TaskForm'
import ErrorModal from './components/ErrorModal'
import AuthStore from './stores/AuthStore'
import PropTypes from 'prop-types'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            isLogged: false,
            showErrorModal: false,
            errorMessage: '',
            errorTitle: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onNotAuthorized = this.onNotAuthorized.bind(this)
        this.closeErrorModal = this.closeErrorModal.bind(this)
    }

    componentDidMount() {
        AuthStore.addLogInListener(this.onChange)
        AuthStore.addUnauthorizedListener(this.onNotAuthorized)
        AuthStore.addLogInListener(this.onChange)
        this.onChange()
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.onChange)
        AuthStore.removeUnauthorizedListener(this.onNotAuthorized)
        AuthStore.removeLogOutListener(this.onChange)
    }

    onChange() {
        this.setState({
            user: AuthStore.get(),
            isLogged: AuthStore.isLogged()
        })
    }

    onNotAuthorized() {
        this.setState({
            errorTitle: 'Unauthorized Activity',
            errorMessage: "You are not authorized to execute requested activity",
            showErrorModal: true
        })
    }

    closeErrorModal() {
        this.setState({
            showErrorModal: false,
            errorTitle: '',
            errorMessage: ""
        })
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <TopMenu isLogged={this.state.isLogged} user={this.state.user} />
                    <Grid>
                        <PrivateRoute exact path="/" component={TaskList} user={this.state.user} />
                        <PrivateRoute path="/task/add" component={TaskForm} user={this.state.user}/>
                        <Route path="/login" render={() => {
                            return (
                                <LoginForm isLogged={this.state.isLogged} />
                            )
                        }}/>
                    </Grid>
                <ErrorModal
                    show={this.state.showErrorModal}
                    close={this.closeErrorModal}
                    title={this.state.errorTitle}
                    body={this.state.errorMessage}
                />
                </div>
            </Router>
        )
    }
}


const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route {...rest} render={props => (
        AuthStore.isLogged() ? (
            <Component {...props} user={user} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
        )
    )}/>
)

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    user: PropTypes.object,
    location: PropTypes.object
}

export default App
