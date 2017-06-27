import React from 'react'
// import UsersStore from '../stores/UsersStore'
import UsersActions from '../actions/UsersActions'
import RolesStore from '../stores/RolesStore'
import RolesActions from '../actions/RolesActions'
import {
    Button, Form, FormControl, FormGroup, ControlLabel, Col, Checkbox, PageHeader, Alert, Modal, Glyphicon, Row
} from 'react-bootstrap'
import PropTypes from 'prop-types'


class UserForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            password: "",
            roles: {},
            allRoles: [],
            showSuccessModal: false
        }

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeRoles = this.onChangeRoles.bind(this)
        this.onChangeRoleList = this.onChangeRoleList.bind(this)
        this.validateName = this.validateName.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        this.validateRoles = this.validateRoles.bind(this)
        this.getErrors = this.getErrors.bind(this)
        this.hasErrors = this.hasErrors.bind(this)
        this.closeSuccessModal = this.closeSuccessModal.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        RolesStore.addChangeListener(this.onChangeRoleList)
        RolesActions.all()
    }

    validateName() {
        let errors = []
        const name = this.state.name

        if (!name) {
            errors.push('Name is required')
        }

        return errors
    }

    validatePassword() {
        let errors = []
        const password = this.state.password

        if (!password) {
            errors.push('Password is required')
        }

        return errors
    }

    validateRoles() {
        let errors = []
        const roles = Object.entries(this.state.roles).filter(entry => entry[1] === true)

        if (!roles || roles.length === 0) {
            errors.push('At least one role should be selected')
        }

        return errors
    }

    getErrors() {
        return (
            this.validateName()
                .concat(this.validatePassword())
                .concat(this.validateRoles())
        )
    }

    closeSuccessModal() {
        this.setState({ showSuccessModal: false })
    }

    hasErrors() {
        return this.getErrors().length > 0
    }

    onChangeName(event) {
        const name = event.target.value
        this.setState({ name })
    }

    onChangePassword(event) {
        const password = event.target.value
        this.setState({ password })
    }

    onChangeRoles(event) {
        const id = event.target.value
        const isChecked = event.target.checked

        let roles = this.state.roles

        roles[id] = isChecked
        this.setState({ roles })
    }

    onChangeRoleList() {
        const roles = RolesStore.all()
        this.setState({ allRoles: roles })
    }

    isRoleChecked(id) {
        const roles = this.state.roles

        if (!roles[id]) {
            return false
        }

        return roles[id]
    }

    onSubmit(event) {
        event.preventDefault()

        if (this.hasErrors()) {
            return
        }

        const name = this.state.name
        const password = this.state.password
        let roles = []

        for (const id in this.state.roles) {
            if (this.state.roles[id]) {
                roles.push(parseInt(id, 10))
            }
        }

        UsersActions.add({ name, password, roles })
        this.setState({ name: "", password: "", roles: [], showSuccessModal: true })
    }

    render() {
        const errors = this.getErrors().map((error, index) => {
            return (<Alert bsStyle="danger" key={index}><p>{ error }</p></Alert>)
        })

        const roles = this.state.allRoles.map((role, index) => {
            return (
                <Checkbox
                    inline
                    key={index}
                    onChange={this.onChangeRoles}
                    value={role.id}
                    name={role.name}
                    checked={this.isRoleChecked(role.id)}
                >{role.name}</Checkbox>
            )
        })

        const validationStateName = this.validateName().length > 0 ? 'error' : null
        const validationStatePassword = this.validatePassword().length > 0 ? 'error' : null
        const validationStateRoles = this.validateRoles().length > 0 ? 'error' : null
        const isSubmitDisabled = this.hasErrors()

        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup controlId="name" validationState={validationStateName}>
                    <Col sm={2} componentClass={ControlLabel}>Name</Col>
                    <Col sm={10}>
                        <FormControl
                            onChange={this.onChangeName}
                            type="text"
                            placeholder="Enter username"
                            value={this.state.name}
                        />
                    </Col>
                </FormGroup>
                <FormGroup controlId="password" validationState={validationStatePassword}>
                    <Col sm={2} componentClass={ControlLabel}>Password</Col>
                    <Col sm={10}>
                        <FormControl
                            onChange={this.onChangePassword}
                            type="password"
                            placeholder="Enter password"
                            value={this.state.password}
                        />
                    </Col>
                </FormGroup>
                <FormGroup controlId="roles" validationState={validationStateRoles}>
                    <Col sm={2} componentClass={ControlLabel}>Roles</Col>
                    <Col sm={10}>
                        {roles}
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
                    username={this.state.name}
                    close={this.closeSuccessModal}
                />
                <div>{errors}</div>
            </Form>
        )
    }
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
                User {props.username} added succesfully.
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
    username: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
}


const UserFormPage = props => {
    return (
        <div>
            <PageHeader>Add new user</PageHeader>
            <UserForm />
        </div>
    )
}


export default UserForm
export { UserFormPage }
