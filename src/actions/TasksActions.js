import { GET_ALL_TASKS, ASSIGN_TASK, UNASSIGN_TASK, GET_NOT_COMPLETED_TASKS } from '../Constants'
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
    },

    notCompleted: () => {
        Api.tasks.notCompleted()
            .then(response => {
                Dispatcher.dispatch({
                    actionType: GET_NOT_COMPLETED_TASKS,
                    data: response.data
                })
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
    },

    unassignTask: (taskId) => {
        Api.tasks.unassignTask(taskId)
            .then(response => {
                Dispatcher.dispatch({
                    actionType: UNASSIGN_TASK,
                    data: response.data
                })
            })
    }
}


export default TasksActions
