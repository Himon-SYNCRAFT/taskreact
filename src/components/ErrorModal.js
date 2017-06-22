import React from 'react'
import { Modal, Button, Row, Col, Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types'


function ErrorModal(props) {
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header>
                <Modal.Title>
                    <Row>
                        <Col md={11}>{props.title}</Col>
                        <Col md={1} offset={11}>
                            <Button onClick={props.close} bsStyle="danger" bsSize="xsmall">
                                <Glyphicon glyph="remove"/>
                            </Button>
                        </Col>
                    </Row>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.body}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.close} bsStyle="primary">
                    <Glyphicon glyph="remove"/> Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ErrorModal.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
}


export default ErrorModal
