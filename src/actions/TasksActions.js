import { COMPLETE_TASK, GET_ALL_TASKS, ADD_TASK, ASSIGN_TASK, UNASSIGN_TASK,
    GET_NOT_COMPLETED_TASKS, CANCEL_TASK, UPDATE_TASK } from '../Constants'
import Dispatcher from '../Dispatcher'
import Api from '../Api'


const TasksActions = {
    all: () => {
        Api.tasks.all()
            .then(response => {
                Dispatcher.dispatch({
                    actionType: GET_ALL_TASKS,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    add: (data) => {
        Api.tasks.add(data)
            .then(response => {
                Dispatcher.dispatch({
                    actionType: ADD_TASK,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    update: (taskId, data) => {
        Api.tasks.update(taskId, data)
            .then(response => {
                Dispatcher.dispatch({
                    actionType: UPDATE_TASK,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    notCompleted: () => {
        Api.tasks.notCompleted()
            .then(response => {
                Dispatcher.dispatch({
                    actionType: GET_NOT_COMPLETED_TASKS,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    assignTask: (taskId) => {
        Api.tasks.assignTask(taskId)
            .then(response => {
                Dispatcher.dispatch({
                    actionType: ASSIGN_TASK,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    unassignTask: (taskId) => {
        Api.tasks.unassignTask(taskId)
            .then(response => {
                Dispatcher.dispatch({
                    actionType: UNASSIGN_TASK,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    completeTask: (taskId) => {
        Api.tasks.completeTask(taskId)
            .then(response => {
                Dispatcher.dispatch({
                    actionType: COMPLETE_TASK,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    cancelTask: (taskId) => {
        Api.tasks.cancelTask(taskId)
            .then(response => {
                Dispatcher.dispatch({
                    actionType: CANCEL_TASK,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export default TasksActions
