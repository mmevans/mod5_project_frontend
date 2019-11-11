import {SET_PROMPTS} from './types'



export const setPrompts = (player) => dispatch => {
    dispatch({
        type: SET_PROMPTS,
        action: player
    })
}