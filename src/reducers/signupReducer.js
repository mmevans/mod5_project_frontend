import { SIGN_UP, LOGGED_IN} from '../actions/types'

const intialState = {
    user: {},
    IsLoggedIn: false
}

export default function signupReducer(state = intialState, action) {
    switch(action.type) {
        case SIGN_UP:
            return {
            ...state,
            user: action.payload,
            IsLoggedIn: true
            }
        case LOGGED_IN:
            return {
                ...state,
                user: action.payload,
                IsLoggedIn: true
            }
        default:
            return {
                ...state
            }
    }
}