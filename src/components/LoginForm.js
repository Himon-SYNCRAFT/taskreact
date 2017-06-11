import React from 'react'
import { PageHeader, Button, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap'
import AuthActions from '../actions/AuthActions'


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: ""
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
    }

    onSubmit(event) {
        event.preventDefault()
        AuthActions.login({
            name: this.state.name,
            password: this.state.password
        })
    }

    onChangeName(event) {
        this.setState({ name: event.target.value })
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <div>
                <PageHeader>Login Form</PageHeader>
                <Form horizontal onSubmit={this.onSubmit}>
                    <FormGroup controlId="name">
                        <Col sm={2} componentClass={ControlLabel}>Name</Col>
                        <Col sm={10}>
                            <FormControl onChange={this.onChangeName} type="text" placeholder="Enter name" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="password">
                        <Col sm={2} componentClass={ControlLabel}>Password</Col>
                        <Col sm={10}>
                            <FormControl
                                onChange={this.onChangePassword}
                                type="password"
                                placeholder="Enter password"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">
                                Submit
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}


export default LoginForm
