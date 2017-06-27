import React from 'react'
import TasksActions from '../actions/TasksActions'
import {
    Alert, PageHeader, Button, Form, FormControl, FormGroup, ControlLabel,
    Col, Row, Modal, Glyphicon
} from 'react-bootstrap'
import PropTypes from 'prop-types'


class TaskForm extends React.Component {
    constructor(props) {
        super(props)
        let state = {
            content: "",
            name: "",
            showSuccessModal: false
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
        this.validateName = this.validateName.bind(this)
        this.validateContent = this.validateContent.bind(this)
        this.closeSuccessModal = this.closeSuccessModal.bind(this)
        this.getErrors = this.getErrors.bind(this)
        this.hasErrors = this.hasErrors.bind(this)
    }

    onChangeContent(event) {
        const content = event.target.value
        this.setState({ content })
    }

    onChangeName(event) {
        const name = event.target.value
        this.setState({ name })
    }

    validateContent() {
        const content = this.state.content
        let errors = []

        if (!content) {
            errors.push('Content is required')
        }

        return errors
    }

    validateName() {
        const name = this.state.name
        let errors = []

        if (!name) {
            errors.push('Name is required')
        }

        return errors
    }

    getErrors() {
        return this.validateName().concat(this.validateContent())
    }

    hasErrors() {
        return this.getErrors().length > 0
    }

    closeSuccessModal() {
        this.setState({ showSuccessModal: false })
    }

    onSubmit(event) {
        event.preventDefault()

        if (this.hasErrors()) {
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

            this.setState({
                name: "",
                content: "",
                showSuccessModal: true
            })
        }
    }

    render() {
        const validationStateName = this.validateName().length > 0 ? 'error' : null
        const validationStateContent = this.validateContent().length > 0 ? 'error' : null

        const errors = this.getErrors().map((error, index) => {
            return (<Alert bsStyle="danger" key={index}><p>{ error }</p></Alert>)
        })
        const isSubmitDisabled = this.hasErrors()

        return (
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
                <SuccessModal
                    show={this.state.showSuccessModal}
                    taskName={this.state.name}
                    close={this.closeSuccessModal}
                />
                <div>
                    {errors}
                </div>
            </Form>
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


const TaskFormPage = props => {
    return (
        <div>
            <PageHeader>Add new task</PageHeader>
            <TaskForm task={props.task} user={props.user} />
        </div>
    )
}

TaskFormPage.propTypes = {
    task: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }),
    user: PropTypes.shape({
        id: PropTypes.number.isRequired
    })
}


const SuccessModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header>
                <Modal.Title>
                    <Row>
                        <Col md={11}>
                            Success!
                        </Col>
                        <Col md={1}>
                            <Button onClick={props.close} bsStyle="danger" bsSize="xsmall">
                                <Glyphicon glyph="remove"/>
                            </Button>
                        </Col>
                    </Row>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Task {props.taskName} added succesfully.
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.close} bsStyle="primary">
                    <Glyphicon glyph="remove"/> Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

SuccessModal.propTypes = {
    taskName: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
}


export default TaskForm
export { TaskFormPage }
