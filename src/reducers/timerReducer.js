import {TOGGLE_TIMER, SET_SECONDS, TICK} from '../actions/types'



const intialState = {
    isActive: false,
    seconds: 0
}
export default function timerReducer(state = intialState, action) {
    switch(action.type) {
        case TOGGLE_TIMER:
            return {
                ...state,
                isActive: !state.isActive
            }
        case SET_SECONDS:
            console.log(action.payload)
            return {
                ...state,
                seconds: state.seconds + action.num
            }
        case TICK:
            return {
                ...state,
                seconds: state.seconds - 1
            }
        default:
            return {
                ...state
            }
    }
}