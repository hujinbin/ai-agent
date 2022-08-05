import * as constants from './contants';

export const getData = (data) => ({
    type: constants.SET_DATA,
    data,
})