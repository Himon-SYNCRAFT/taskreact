import Dispatcher from '../Dispatcher'
import { EventEmitter } from 'events'
import { ADD_USER, GET_ALL_USERS } from '../Constants'


const CHANGE = 'CHANGE'
let _users = []

const UsersStore = Object.assign({}, EventEmitter.prototype, {
    all: () => _users,

    addChangeListener: function(callback) {
        this.on(CHANGE, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback)
    }
})

Dispatcher.register(action => {
    switch (action.actionType) {
        case GET_ALL_USERS:
            _users = action.data
            UsersStore.emit(CHANGE)
            break

        case ADD_USER:
            const user = action.data
            _users.push(user)
            UsersStore.emit(CHANGE)
            break

        default:
            break
    }
})

export default UsersStore
