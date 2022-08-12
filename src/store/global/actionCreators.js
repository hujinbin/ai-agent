import * as constants from './contants';

export const setToken = (data) => ({
    type: constants.SET_TOKEN,
    data,
})