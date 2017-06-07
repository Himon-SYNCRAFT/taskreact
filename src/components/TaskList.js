import React, { Component } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Button, ButtonGroup, Glyphicon, Modal } from 'react-bootstrap'


class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { name: 'task1' },
                { name: 'task2' },
                { name: 'task3' }
            ]
        }
    }

    render() {
        const items = this.state.items.map((item, index) => {
            return (
                <ListGroupItem key={index}><TaskItem task={item} /></ListGroupItem>
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
    }

    close() {
        this.setState({ showModal: false })
    }

    open() {
        this.setState({ showModal: true })
    }

    render() {
        return (
            <Row>
                <Col md={7}>
                    <span>{this.props.task.name} </span>
                </Col>
                <Col md={5}>
                    <ButtonGroup>
                        <Button onClick={this.open}>
                            <Glyphicon glyph="eye-open" /> Show
                        </Button>
                        <Button>
                            <Glyphicon glyph="user" /> Assign
                        </Button>
                        <Button>
                            <Glyphicon glyph="check" /> Complete
                        </Button>
                        <Button>
                            <Glyphicon glyph="ban-circle"/> Cancel
                        </Button>
                    </ButtonGroup>
                </Col>
                <TaskDetails show={this.state.showModal} task={this.props.task} close={this.close} />
            </Row>
        )
    }
}


function TaskDetails(props) {
    return (
        <div>
            <Modal show={props.show} onHide={props.close}>
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    tekst
                    {props.task.name}
                </Modal.Body>

                <Modal.Footer>
                    <ButtonGroup>
                        <Button>
                            <Glyphicon glyph="user" /> Assign
                        </Button>
                        <Button>
                            <Glyphicon glyph="check" /> Complete
                        </Button>
                        <Button>
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


export { TaskList, TaskItem }
