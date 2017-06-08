import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://danielzawlocki.pl/taskplus/api/',
    // baseURL: 'http://127.0.0.1:5000/',
    withCredentials: true
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

        notCompleted: () => {
            return instance.get('/tasks/notcompleted')
        },

        assignTask: (taskId, userId) => {
            return instance.get('/task/' + taskId + '/assign/' + userId)
        },

        unassignTask: (taskId) => {
            return instance.get('/task/' + taskId + '/unassign')
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
        }
    },

    userRoles: {
        all: () => {
            return instance.get('/roles')
        }
    }
}


export default Api
