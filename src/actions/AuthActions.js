import { LOG_IN } from '../Constants'
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
    }
}


export default actions
