import Dispatcher from '../Dispatcher'
import { EvenEmitter } from 'events'
import { GET_ALL_TASKS } from '../Constants'


const CHANGE = 'CHANGE'
let _tasks = []

const TasksStore = Object.assign({}, EvenEmitter.prototype, {
    all: () => _tasks
})

Dispatcher.register(action => {
    switch (action.actionType) {
        case GET_ALL_TASKS:
            _tasks = action.data
            TasksStore.Emit(CHANGE)
            break
    }
})


export default TasksStore
