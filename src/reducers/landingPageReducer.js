import { LOGGED_IN, SIGN_UP, LOGIN_ERROR, SET_USERNAME, SET_EMAIL, SET_PASSWORD, SET_C_PASSWORD, SET_L_EMAIL, SET_L_PASSWORD} from '../actions/types'
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const intialState = {
    user: {},
    username: '',
    email: '',
    password: '',
    password_digest: '',
    loginEmail: '',
    loginPassword: '',
    isLoggedIn: false,
    error: ''
}

function landingPageReducer(state = intialState, action) {
    switch(action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
        }
        case SET_C_PASSWORD:
            return {
                ...state,
                password_digest: action.payload
        }
        case SET_L_EMAIL:
            return {
                ...state,
                loginEmail: action.payload
            }
        case SET_L_PASSWORD:
            return {
            ...state,
            loginPassword: action.payload
        }
        case LOGGED_IN:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            }
        case SIGN_UP:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
        }
        case LOGIN_ERROR:
            return {
                ...state,
                error: 'ERROR HERE DUMMY'
            }
        default:
            return {
                ...state
            }
    }
}

const persistConfig = {
    key: 'landing',
    storage: storage,
    whitelist: [
        'user'
    ]
}

export default persistReducer(persistConfig, landingPageReducer)