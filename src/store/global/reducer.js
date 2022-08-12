import * as constants from "./contants";
import { fromJS } from "immutable";

const defaultState = fromJS({
    token: localStorage.getItem('token') || '',
})

const setToken = (state, action) => {
    return state.set('token', action.data)
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.SET_TOKEN:
            return setToken(state, action);
        default:
            return state;
    }
}

export default reducer

