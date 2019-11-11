import { SET_ROOM, SET_NAME } from '../actions/types'

const initialState = {
    name: '',
    room_id: ''
}

export default function joinReducer(state = initialState, action) {
    switch(action.type) {
        case SET_NAME: {
            return {
                ...state,
                name: action.payload
            }
        }
        case SET_ROOM: {
            return {
                ...state,
                room_id: action.payload
            }
        }
        default:
            return {
                ...state
            }
    }
}