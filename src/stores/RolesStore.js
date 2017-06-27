import Dispatcher from '../Dispatcher'
import { EventEmitter } from 'events'
import { GET_ALL_ROLES } from '../Constants'


const CHANGE = 'CHANGE'
let _roles = []

const RolesStore = Object.assign({}, EventEmitter.prototype, {
    all: () => _roles,

    addChangeListener: function(callback) {
        this.on(CHANGE, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback)
    }
})

Dispatcher.register(action => {
    switch (action.actionType) {
        case GET_ALL_ROLES:
            _roles = action.data
            RolesStore.emit(CHANGE)
            break

        default:
            break
    }
})

export default RolesStore
