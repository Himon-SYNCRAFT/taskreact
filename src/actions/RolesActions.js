import { GET_ALL_ROLES } from '../Constants'
import Dispatcher from '../Dispatcher'
import Api from '../Api'


const RolesActions = {
    all: () => {
        Api.roles.all()
            .then(response => {
                Dispatcher.dispatch({
                    actionType: GET_ALL_ROLES,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export default RolesActions
