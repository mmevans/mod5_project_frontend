import {FETCH_USERS, SIGN_UP, LOGGED_IN} from './types'

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
        .then(user => dispatch({
            type: LOGGED_IN,
            payload: user
        }))
}