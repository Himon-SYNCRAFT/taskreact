import { LOG_IN, LOG_OUT, UNAUTHORIZED } from '../Constants'
import Api from '../Api'
import Dispatcher from '../Dispatcher'


const actions = {
    login: (credentials) => {
        Api.auth.login(credentials)
            .then(response => {
                Dispatcher.dispatch({
                    actionType: LOG_IN,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    logout: () => {
        Api.auth.logout()
            .then(response => {
                Dispatcher.dispatch({
                    actionType: LOG_OUT
                })
            })
            .catch(error => {
                console.log(error)
            })
    },

    notAuthorized: () => {
        Dispatcher.dispatch({
            actionType: UNAUTHORIZED
        })
    }
}


export default actions
