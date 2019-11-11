import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './userHomepage.css'
import {goToLobby, generateRoomID } from '../../actions/joinRoomActions'
import {Redirect} from 'react-router-dom'
import io from 'socket.io-client';
import Timer from '../Timer/Timer'

export const UserHomepage = (props) => {
    const dispatch = useDispatch();
    const lobby = useSelector(state => state.userHome.goToLobby)
    const room_id = useSelector(state => state.userHome.room_id)
    const username = useSelector(state => state.landing.user.username)

    const handleChange = () => {
        dispatch(generateRoomID(5))
        dispatch(goToLobby())
    }

    if(lobby === true) {
        return  <Redirect push to={`/main-lobby?name=${username}&room=${room_id}`}/>
    }
    return(
        <div className='userHomeContainer'>
            <div className='middle'>
                <div className='createLobby'>
                    <h3 onClick={() => handleChange()}>Create A Lobby Here!</h3>
                </div>
                <div className='createCollection'>
                    <h3>Make your own Collection!</h3>
                </div>
            </div>
        </div>
    )
}

export default UserHomepage