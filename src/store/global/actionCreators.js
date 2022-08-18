import * as constants from './contants';

export const setToken = (data) => ({
    type: constants.SET_TOKEN,
    data,
})

export const setDomainList = (data) => ({
    type: constants.SET_DOMAIN_LIST,
    data,
})

export const setCurrentDomain = (data) => ({
    type: constants.SET_CURRENT_DOMAIN,
    data,
})