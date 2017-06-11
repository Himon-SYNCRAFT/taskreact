import { GET_ALL_TASKS, ADD_TASK, ASSIGN_TASK, UNASSIGN_TASK, GET_NOT_COMPLETED_TASKS } from '../Constants'
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

    assignTask: (taskId, userId) => {
        Api.tasks.assignTask(taskId, userId)
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
    }
}


export default TasksActions
