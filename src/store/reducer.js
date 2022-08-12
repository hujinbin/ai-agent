import { combineReducers } from "redux-immutable";
import { reducer as globalReducer } from './global'

const reducer = combineReducers({
    global: globalReducer,
})

export default reducer
