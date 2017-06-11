import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { TaskList } from './components/TaskList'
import LoginForm from './components/LoginForm'
import TopMenu from './components/TopMenu'
import TaskForm from './components/TaskForm'


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <TopMenu />
                    <Grid>
                        <Route exact path="/" component={TaskList} />
                        <Route path="/task/add" component={TaskForm} />
                        <Route path="/login" component={LoginForm} />
                    </Grid>
                </div>
            </Router>
        )
    }
}

export default App
