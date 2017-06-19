import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { TaskList } from './components/TaskList'
import LoginForm from './components/LoginForm'
import TopMenu from './components/TopMenu'
import TaskForm from './components/TaskForm'
import AuthStore from './stores/AuthStore'


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            isLogged: false
        }

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        AuthStore.addLogInListener(this.onChange)
        AuthStore.addUnauthorizedListener(this.onChange)
        this.onChange()
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.onChange)
        AuthStore.removeUnauthorizedListener(this.onChange)
    }

    onChange() {
        this.setState({
            user: AuthStore.get(),
            isLogged: AuthStore.isLogged()
        })
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <TopMenu isLogged={this.state.isLogged} />
                    <Grid>
                        <PrivateRoute exact path="/" component={TaskList} />
                        <PrivateRoute path="/task/add" component={TaskForm} />
                        <Route path="/login" render={() => {
                            return (
                                <LoginForm isLogged={this.state.isLogged} />
                            )
                        }}/>
                    </Grid>
                </div>
            </Router>
        )
    }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        AuthStore.isLogged() ? (
            <Component {...props}/>
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
        )
    )}/>
)

export default App
