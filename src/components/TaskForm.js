import React from 'react'
import TasksActions from '../actions/TasksActions'
import { PageHeader, Button, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'


class TaskForm extends React.Component {
    constructor(props) {
        super(props)
        let state = {
            content: "",
            name: "",
            nameErrors: [],
            contentErrors: []
        }

        if (this.props.task) {
            const task = this.props.task
            state.content = task.content
            state.name = task.name
        }

        this.state = state

        this.onChangeContent = this.onChangeContent.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.nameHasErrors = this.nameHasErrors.bind(this)
        this.contentHasErrors = this.contentHasErrors.bind(this)
    }

    componentDidMount() {
        if (!this.state.name) {
            this.setState({ nameErrors: ['Name is required'] })
        }

        if (!this.state.content) {
            this.setState({ contentErrors: ['Content is required'] })
        }
    }

    onChangeContent(event) {
        const content = event.target.value
        let errors = []

        if (!content) {
            errors.push('Content is required')
        }

        this.setState({ content, contentErrors: errors })
    }

    onChangeName(event) {
        const name = event.target.value
        let errors = []

        if (!name) {
            errors.push('Name is required')
        }

        this.setState({ name, nameErrors: errors })
    }

    nameHasErrors() {
        return this.state.nameErrors.length > 0
    }

    contentHasErrors() {
        return this.state.contentErrors.length > 0
    }

    getErrors() {
        return this.state.nameErrors.concat(this.state.contentErrors)
    }

    onSubmit(event) {
        event.preventDefault()

        if (this.nameHasErrors() || this.contentHasErrors()) {
            return
        }

        if (this.props.task && this.props.task.id) {
            TasksActions.update(this.props.task.id, {
                name: this.state.name,
                content: this.state.content
            })
        } else {
            TasksActions.add({
                creator_id: this.props.user.id,
                name: this.state.name,
                content: this.state.content
            })
        }
    }

    render() {
        const validationStateName = this.nameHasErrors() ? 'error' : null
        const validationStateContent = this.contentHasErrors() ? 'error' : null

        const errors = this.getErrors().map((error, index) => <p key={index}>{ error }</p>)
        const isSubmitDisabled = this.nameHasErrors() || this.contentHasErrors()

        return (
            <div>
                <PageHeader>Add new task</PageHeader>
                <Form horizontal onSubmit={this.onSubmit}>
                    <FormGroup controlId="name" validationState={validationStateName}>
                        <Col sm={2} componentClass={ControlLabel}>Name</Col>
                        <Col sm={10}>
                            <FormControl
                                onChange={this.onChangeName}
                                type="text"
                                placeholder="Enter task's name"
                                value={this.state.name}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="content" validationState={validationStateContent}>
                        <Col sm={2} componentClass={ControlLabel}>Content</Col>
                        <Col sm={10}>
                            <FormControl
                                onChange={this.onChangeContent}
                                componentClass="textarea"
                                placeholder="Enter task's decription"
                                value={this.state.content}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" disabled={isSubmitDisabled}>
                                Submit
                            </Button>
                        </Col>
                    </FormGroup>
                    <div>
                        {errors}
                    </div>
                </Form>
            </div>
        )
    }
}

TaskForm.propTypes = {
    task: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }),
    user: PropTypes.shape({
        id: PropTypes.number.isRequired
    })
}


export default TaskForm
