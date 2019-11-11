import {FETCH_USERS, SIGN_UP, LOGGED_IN, LOGIN_ERROR, SET_USERNAME, SET_EMAIL, SET_PASSWORD, SET_C_PASSWORD, SET_L_EMAIL, SET_L_PASSWORD} from './types'
export const fetchUsers = () => dispatch => {
       fetch('http://localhost:3000/users')
       .then(res => res.json())
       .then(users => dispatch({
           type: FETCH_USERS,
           payload: users
       }))
}

export const createUser = (userData) => dispatch => {
    fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userData})
        })
        .then(res => res.json())
        .then(user => dispatch({
            type: SIGN_UP,
            payload: user
        }))
}

export const loginUser = (userData) => dispatch => {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userData})
        })
        .then(res => res.json())
        .then(user => {
            if(user.success === true) {
                dispatch({
                    type: LOGGED_IN,
                    payload: user
                })
            } else {
                dispatch({
                    type: LOGIN_ERROR
                })
            }
        })
}

export const setUsername = (e) => dispatch => {
    dispatch({
        type: SET_USERNAME,
        payload: e.target.value
    })
}

export const setEmail = (e) => dispatch => {
    dispatch({
        type: SET_EMAIL,
        payload: e.target.value
    })
}

export const setPassword = (e) => dispatch => {
    dispatch({
        type: SET_PASSWORD,
        payload: e.target.value
    })
}

export const setConfPassword = (e) => dispatch => {
    dispatch({
        type: SET_C_PASSWORD,
        payload: e.target.value
    })
}

export const setLoginEmail = (e) => dispatch => {
    dispatch({
        type: SET_L_EMAIL,
        payload: e.target.value
    })
}
export const setLoginPassword = (e) => dispatch => {
    dispatch({
        type: SET_L_PASSWORD,
        payload: e.target.value
    })
}

export const loginError = (e) => dispatch => {
    dispatch({
        type: LOGIN_ERROR
    })
}