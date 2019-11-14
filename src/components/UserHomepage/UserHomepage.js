import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './userHomepage.css'
import {goToLobby, generateRoomID } from '../../actions/joinRoomActions'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {Redirect} from 'react-router-dom'

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
                <Button inverted color='orange' onClick={() => handleChange()}>
                    Create Your Lobby!
                </Button>
                </div>
                <div className='createCollection'>
                <Button inverted color='green'>
                    Create Your Own Deck!
                </Button>
                </div>
            </div>
        </div>
    )
}

export default UserHomepage