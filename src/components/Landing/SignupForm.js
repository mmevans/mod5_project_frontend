import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import { createUser } from '../../actions/userActions'


export const SignupForm = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.signup.IsLoggedIn)

    const handleSubmit = (e) => {
        e.preventDefault()
        const new_user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password_digest: e.target.password.value
        }
        dispatch(createUser(new_user))
    }

    if(isLoggedIn === true) {
        return <Redirect push to={'/homepage'}></Redirect>
    } else {
    return(
        <div>
        <h1>This is the Signup Form</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Field required>
            <label>Username: </label>
            <input placeholder='Name' name='username'/>
        </Form.Field>
        <Form.Field required>
            <label>Email: </label>
            <input placeholder='email' name='email'/>
        </Form.Field>
        <Form.Field required>
            <label>Password</label>
            <input type='password' name='password'/>
        </Form.Field>
        <Form.Field required>
            <label>Confirm Password</label>
            <input type='password' name='password_confirmation'/>
        </Form.Field>
        <Button type='submit' className='signupButton'>Submit</Button>
        </Form>
        </div>
    )}
}

export default SignupForm