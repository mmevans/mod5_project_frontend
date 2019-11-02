import React from 'react'
import {Button, Form} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../actions/userActions';
import {Redirect} from 'react-router-dom'


export const LoginForm = (props) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.signup.IsLoggedIn)

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        dispatch(loginUser(user))
    }

    if(isLoggedIn === true) {
        return <Redirect push to={'/homepage'}></Redirect>
    } else {
    return(
        <div>
        <h1>This is the Login Form</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Field required>
            <label>Email: </label>
            <input placeholder='email' name='email'/>
        </Form.Field>
        <Form.Field required>
            <label>Password</label>
            <input type='password' name='password'/>
        </Form.Field>
        <Button type='submit' className='signupButton'>Submit</Button>
        </Form>
        </div>
    )}
}