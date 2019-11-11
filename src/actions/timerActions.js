import {TOGGLE_TIMER, SET_SECONDS, TICK} from './types'


export const setIsActive = () => dispatch => {
    dispatch({
        type: TOGGLE_TIMER
    })
}

export const setSeconds = (num) => dispatch => {
    dispatch({
        type: SET_SECONDS,
        num
    })
}

export const tick = () => dispatch => {
    dispatch({
        type: TICK
    })
}