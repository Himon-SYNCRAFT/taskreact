import axios from 'axios'
import AuthActions from './actions/AuthActions'
import Dispatcher from './Dispatcher'
import { LOG_OUT } from './Constants'
import { Promise } from 'es6-promise'


const instance = axios.create({
    baseURL: 'http://danielzawlocki.pl/taskplus/api/',
    // baseURL: 'http://127.0.0.1:5000/',
    withCredentials: true
})

instance.interceptors.response.use(undefined, error => {
    if (!error.hasOwnProperty('response') || error.response === undefined) {
        return Promise.reject(error)
    } else if (error.response.status === 401) {
        Dispatcher.dispatch({
            actionType: LOG_OUT
        })
    } else if (error.response.status === 403) {
        AuthActions.notAuthorized()
    }

    return Promise.reject(error)
})

const Api = {
    auth: {
        login: (credentials) => {
            return instance.post('/auth/login', credentials)
        },
        logout: () => {
            return instance.get('/auth/logout')
        }
    },

    tasks: {
        all: () => {
            return instance.get('/tasks')
        },

        add: (data) => {
            return instance.post('/task', data)
        },

        notCompleted: () => {
            return instance.get('/tasks/notcompleted')
        },

        assignTask: (taskId) => {
            return instance.get('/task/' + taskId + '/assign')
        },

        unassignTask: (taskId) => {
            return instance.get('/task/' + taskId + '/unassign')
        },

        completeTask: (taskId) => {
            return instance.get('/task/' + taskId + '/complete')
        },

        cancelTask: (taskId) => {
            return instance.get('/task/' + taskId + '/cancel')
        },

        update: (taskId, data) => {
            return instance.put('/task/' + taskId, data)
        }
    },

    taskStatuses: {
        all: () => {
            return instance.get('/statuses')
        }
    },

    users: {
        all: () => {
            return instance.get('/users')
        },

        add: (data) => {
            return instance.post('/user', data)
        }
    },

    roles: {
        all: () => {
            return instance.get('/roles')
        }
    }
}


export default Api
