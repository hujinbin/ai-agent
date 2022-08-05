import * as constants from "./contants";
import { fromJS } from "immutable";

const defaultState = fromJS({
    myData: null
})

const getData = (state, action) => {
    return state.set('myData', action.data)
}

const reducer = (state = defaultState, action) => {
    // 由于state是引用型，不能直接修改，否则是监测不到state发生变化的。因此需要先复制一份进行修改，然后再返回新的state。
    switch (action.type) {
        case constants.SET_DATA:
            return getData(state, action);
        default:
            return state;
    }
}

export default reducer

