import { ADD_USER, GET_ALL_USERS } from '../Constants'
import Dispatcher from '../Dispatcher'
import Api from '../Api'


const UsersActions = {
    all: () => {
        Api.users.all()
            .then(response => {
                Dispatcher.dispatch({
                    actionType: GET_ALL_USERS,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    add: (data) => {
        Api.users.add(data)
            .then(response => {
                Dispatcher.dispatch({
                    actionType: ADD_USER,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export default UsersActions
