import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import $ from 'jquery';
import './landing.css'
import overloads from '../../images/classOverlords.png'
import { Button } from 'semantic-ui-react'
import {setUsername, setEmail, setConfPassword, setPassword, setLoginEmail, setLoginPassword, loginUser, createUser} from '../../actions/userActions'
import {Redirect} from 'react-router-dom'


export const LandingPage = (props) => {

    const dispatch = useDispatch();
    const username = useSelector(state => state.landing.username)
    const email = useSelector(state => state.landing.email)
    const password = useSelector(state => state.landing.password)
    const password_digest = useSelector(state => state.landing.password_digest)
    const loginEmail = useSelector(state => state.landing.loginEmail)
    const isLoggedIn = useSelector(state => state.landing.isLoggedIn)
    const loginPassword = useSelector(state => state.landing.loginPassword)
    const error = useSelector(state => state.landing.error)

    const onLoginBtnClick = () => {
        if ($(".login").css("display") === "none") {
            $(".form").addClass("animated flipInY");
            $(".sign-up").hide();
            $(".login").show();
            setTimeout(function() {
                $(".form").removeClass("animated flipInY");
            }, 1000);
        } 
    }

    const onSignupBtnClick = () =>  {
        if ($(".sign-up").css("display") === "none") {
            $(".form").addClass("animated flipInY");
            $(".sign-up").show();
            $(".login").hide();
            setTimeout(function() {
                $(".form").removeClass("animated flipInY");
            }, 1000);
        }
    }

    const handleLogin = () => {
        if(loginEmail === '' || loginPassword === '') {
            alert('You need to fill our the form')
        } else {
            const user = {
                email: loginEmail,
                password: loginPassword
            }
        dispatch(loginUser(user))
        }
    }

    const handleSignup = () => {
        if(username === '' || email === '' || password_digest === '') {
            alert('dummy')
        } else {
        const new_user = {
            username: username,
            email: email,
            password_digest: password_digest
        }
        dispatch(createUser(new_user))
    }
    }
    if(isLoggedIn === true) {
        return <Redirect push to={'/homepage'}></Redirect>
    } else {
    return(
    <div>
        <h1></h1>
        <div className="wrapper">
			<div className="grid-container">
              <div className='signupform'>
				<div className="form">
                    <div className='sign-up'>
					 <div className="signupGridContainer">
					    <div className="avatar-wrapper">	
					        <img src={overloads} className="avatar" alt='class overloards!!'/>
						</div>
                        
                        <div className='signupUsername'>
                            <input type="username" placeholder="Username" value={username} onChange={(e) => dispatch(setUsername(e))} />
                        </div>
                        <div className='signupEmail'>
						    <input type="email" placeholder="Email" value={email} onChange={(e) => dispatch(setEmail(e))}/>
                        </div>
                        <div className='signupPassword'>
						    <input type="password" placeholder="Password"  value={password} onChange={(e) => dispatch(setPassword(e))}/>
                        </div>
                        <div className='signupConfPassword'> 
						    <input type="password" placeholder="Confirm Password" value={password_digest} onChange={(e) => dispatch(setConfPassword(e))}/>
                        </div>
                        <div className='signupSubmitButton'>
                            <Button className='signupButtonOnForm' onClick={() => handleSignup()}>Sign Up</Button>
                        </div>
                        <div className='signupButtons'>
                            <div className="button-group">
						        <button className="btn login-btn" type="submit" onClick={() => onLoginBtnClick()}>LOGIN</button>
						        <button className="btn signup-btn" type="submit" onClick={() => onSignupBtnClick()}>SIGN UP</button>
					        </div>
                        </div>
					 </div>
                    </div>
                    <div className='login'>
					 <div className="loginGridContainer">
					    <div className="avatar-wrapper">	
					        <img src={overloads} className="avatar" alt='class overloards!!'/>
						</div>
                        <div>
                        </div>
                        <div className='loginEmail'>
                        <input className='inputEmail' type="email" placeholder="Email" value={loginEmail} onChange={(e) => dispatch(setLoginEmail(e))}/>
                        </div>
                        <div className='loginPassword'>
						<input type="password" placeholder="Password" value={loginPassword} onChange={(e) => dispatch(setLoginPassword(e))}/>
                        {error !== '' ? error : null}
                        </div>
                        <div className='loginSubmitButton'>
                            <Button onClick={() => handleLogin()}>Login</Button>
                        </div>
					    <div className='loginButtons'>
                            <div className="button-group">
						        <button className="btn login-btn" type="submit" onClick={() => onLoginBtnClick()}>LOGIN</button>
						        <button className="btn signup-btn" type="submit" onClick={() => onSignupBtnClick()}>SIGN UP</button>
					        </div>
                        </div>
                     </div>
                     </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
    )}
}