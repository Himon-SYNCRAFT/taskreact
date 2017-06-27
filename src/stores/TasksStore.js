import Dispatcher from '../Dispatcher'
import { EventEmitter } from 'events'
import { GET_ALL_TASKS, GET_NOT_COMPLETED_TASKS, ASSIGN_TASK, UNASSIGN_TASK,
    COMPLETE_TASK, CANCEL_TASK, UPDATE_TASK, ADD_TASK } from '../Constants'


const CHANGE = 'CHANGE'
let _tasks = []

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    all: () => _tasks,
    notCompleted: () => _tasks.filter(task => {
        return task.status.name === 'new' || task.status.name === 'in progress'
    }),

    addChangeListener: function(callback) {
        this.on(CHANGE, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback)
    }
})

Dispatcher.register(action => {
    switch (action.actionType) {
        case GET_ALL_TASKS:
            _tasks = action.data
            TasksStore.emit(CHANGE)
            break

        case ADD_TASK:
            const task = action.data
            _tasks.push(task)
            TasksStore.emit(CHANGE)
            break

        case GET_NOT_COMPLETED_TASKS:
            _tasks = action.data
            TasksStore.emit(CHANGE)
            break

        case ASSIGN_TASK:
        case UNASSIGN_TASK:
        case COMPLETE_TASK:
        case CANCEL_TASK:
        case UPDATE_TASK:
            const taskId = action.data.id
            const index = _tasks.findIndex(item => item.id === taskId)

            if (index !== -1) {
                _tasks[index] = action.data
            } else {
                _tasks.push(action.data)
            }
            TasksStore.emit(CHANGE)
            break

        default:
            break
    }
})


export default TasksStore
