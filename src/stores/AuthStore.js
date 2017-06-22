import Dispatcher from '../Dispatcher'
import { EventEmitter } from 'events'
import { LOG_IN, LOG_OUT, UNAUTHORIZED } from '../Constants'


const AuthStore = Object.assign({}, EventEmitter.prototype, {
    addLogInListener: function(callback) {
        this.on(LOG_IN, callback)
    },

    removeLogInListener: function(callback) {
        this.removeListener(LOG_IN, callback)
    },

    addUnauthorizedListener: function(callback) {
        this.on(UNAUTHORIZED, callback)
    },

    removeUnauthorizedListener: function(callback) {
        this.removeListener(UNAUTHORIZED, callback)
    },

    get: function() {
        if (!this.isLogged()) {
            return {}
        }

        const userId = parseInt(localStorage.getItem('userId'), 10)
        const userName = localStorage.getItem('userName')

        return {
            name: userName,
            id: userId
        }
    },

    isLogged: function() {
        return localStorage.getItem('userId') != null && localStorage.getItem('userName') != null
    }
})


Dispatcher.register(action => {
    switch (action.actionType) {
        case LOG_IN:
            localStorage.setItem('userId', action.data.id)
            localStorage.setItem('userName', action.data.name)
            AuthStore.emit(LOG_IN)
            break

        case UNAUTHORIZED:
        case LOG_OUT:
            localStorage.removeItem('userId')
            localStorage.removeItem('userName')
            AuthStore.emit(UNAUTHORIZED)
            break

        default:
            break
    }
})


export default AuthStore
