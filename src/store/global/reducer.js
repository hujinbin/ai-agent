import * as constants from "./contants";
import { fromJS } from "immutable";

const defaultState = fromJS({
    token: localStorage.getItem('token') || '',
    domainList: [],
    currentDomain: localStorage.getItem('currentDomain') || '',
})

const setToken = (state, action) => {
    return state.set('token', action.data)
}

const setDomainList = (state, action) => {
    return state.set('domainList', action.data);
}

const setCurrentDomain = (state, action) => {
    localStorage.setItem('currentDomain', action.data)
    return state.set('currentDomain', action.data);
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.SET_TOKEN:
            return setToken(state, action);
        case constants.SET_DOMAIN_LIST:
            return setDomainList(state, action);
        case constants.SET_CURRENT_DOMAIN:
            return setCurrentDomain(state, action);
        default:
            return state;
    }
}

export default reducer

