import { combineReducers } from "redux-immutable";
import { reducer as loginReducer } from '../components/login/store'
import { reducer as headerReducer } from '../components/header/store'

const reducer = combineReducers({
    login: loginReducer,
    header: headerReducer,
})

export default reducer
