import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import './App.css'
import { TaskList } from './components/TaskList'


class App extends Component {
    render() {
        return (
            <div className="App">
                <Grid>
                    <TaskList />
                </Grid>
            </div>
        )
    }
}

export default App
