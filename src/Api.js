import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://danielzawlocki.pl/taskplus/api/',
    withCredentials: true
})

const Api = {
    auth: {
        login: (data) => {
            return instance.post('/auth/login', data)
        },
        logout: () => {
            return instance.get('/auth/logout')
        }
    },

    tasks: {
        all: () => {
            return instance.get('/tasks')
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


export { Api as default }
