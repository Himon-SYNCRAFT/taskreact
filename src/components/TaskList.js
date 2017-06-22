import React, { Component } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Button, ButtonGroup, Glyphicon, Modal } from 'react-bootstrap'
import TasksStore from '../stores/TasksStore'
import TasksActions from '../actions/TasksActions'
import PropTypes from 'prop-types'


class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        TasksStore.addChangeListener(this.onChange)
        TasksActions.notCompleted()
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this.onChange)
    }

    onChange() {
        const tasks = TasksStore.all()
        this.setState({ tasks })
    }

    render() {
        const userId = this.props.user ? this.props.user.id : null
        const items = this.state.tasks.map((task, index) => {
            return (
                <ListGroupItem key={index}>
                    <TaskItem task={task} userId={userId} />
                </ListGroupItem>
            )
        })

        return (
            <ListGroup id="task-list">
                {items}
            </ListGroup>
        )
    }
}

class TaskItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }

        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.toggleAssign = this.toggleAssign.bind(this)
        this.isUserAssignedToTask = this.isUserAssignedToTask.bind(this)
        this.completeTask = this.completeTask.bind(this)
        this.cancelTask = this.cancelTask.bind(this)
    }

    isUserAssignedToTask() {
        if (!this.props.task.doer) {
            return false
        }

        return this.props.task.doer.id === this.props.userId
    }

    close() {
        this.setState({ showModal: false })
    }

    open() {
        this.setState({ showModal: true })
    }

    toggleAssign() {
        if (!this.isUserAssignedToTask()) {
            const taskId = this.props.task.id
            TasksActions.assignTask(taskId)
        } else {
            const taskId = this.props.task.id
            TasksActions.unassignTask(taskId)
        }
    }

    completeTask() {
        TasksActions.completeTask(this.props.task.id)
    }

    cancelTask() {
        TasksActions.cancelTask(this.props.task.id)
    }

    render() {
        const doer = this.props.task.doer

        let buttons = [
            <Button key={0} onClick={this.open}>
                <Glyphicon glyph="eye-open" /> Show
            </Button>
        ]

        if (!doer) {
            buttons.push(
                <Button key={buttons.length + 1} onClick={this.toggleAssign}>
                    <Glyphicon glyph="user" /> Assign
                </Button>
            )
        } else if (this.isUserAssignedToTask()) {
            buttons.push(
                <Button key={buttons.length + 1} onClick={this.toggleAssign}>
                    <Glyphicon glyph="user" /> Unassign
                </Button>
            )
            buttons.push(
                <Button key={buttons.length + 1} onClick={this.completeTask}>
                    <Glyphicon glyph="check" /> Complete
                </Button>
            )
            buttons.push(
                <Button key={buttons.length + 1} onClick={this.cancelTask}>
                    <Glyphicon glyph="ban-circle"/> Cancel
                </Button>
            )
        }

        return (
            <Row>
                <Col md={7}>
                    <span style={{ lineHeight: "34px" }}>{this.props.task.name} </span>
                </Col>
                <Col md={5}>
                    <ButtonGroup>
                        {buttons}
                    </ButtonGroup>
                </Col>
                <TaskDetails
                    show={this.state.showModal}
                    task={this.props.task}
                    close={this.close}
                    toggleAssign={this.toggleAssign}
                    completeTask={this.completeTask}
                    cancelTask={this.cancelTask}
                    assignedToTask={this.isUserAssignedToTask()}
                />
            </Row>
        )
    }
}

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        doer: PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    }),
    userId: PropTypes.number
}


function TaskDetails(props) {
    const creator = props.task.creator.name
    const doer = props.task.doer ? props.task.doer.name : 'Not assigned'
    const taskName = props.task.name
    const status = props.task.status.name
    const content = props.task.content
    const buttonAssignText = props.assignedToTask ? "Unassign" : "Assign"

    return (
        <div>
            <Modal show={props.show} onHide={props.close}>
                <Modal.Header>
                    <Modal.Title>{taskName} ({status})</Modal.Title>
                </Modal.Header>

                <Modal.Body>
					<p>Creator: {creator}</p>
					<p>Doer: {doer}</p>
					<p>{content}</p>
                </Modal.Body>

                <Modal.Footer>
                    <ButtonGroup>
                        <Button onClick={props.toggleAssign}>
                            <Glyphicon glyph="user" /> { buttonAssignText }
                        </Button>
                        <Button onClick={props.completeTask}>
                            <Glyphicon glyph="check" /> Complete
                        </Button>
                        <Button onClick={props.cancelTask}>
                            <Glyphicon glyph="ban-circle"/> Cancel
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={props.close} bsStyle="primary">
                            <Glyphicon glyph="remove"/> Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


TaskDetails.propTypes = {
    task: PropTypes.shape({
        name: PropTypes.string.isRequired,
        creator: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        status: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        doer: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        content: PropTypes.string.isRequired
    }),
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    toggleAssign: PropTypes.func.isRequired,
    completeTask: PropTypes.func.isRequired,
    cancelTask: PropTypes.func.isRequired,
    assignedToTask: PropTypes.bool.isRequired
}


export { TaskList, TaskItem }
