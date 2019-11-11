import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import {setName, setRoom} from '../../actions/joinRoomActions'

export const JoinRoom = (props) => {
    
    const dispatch = useDispatch();
    const name = useSelector(state => state.joinRoom.name)
    const room_id = useSelector(state => state.joinRoom.room_id)

    const handleNameChange = (e) => {
        dispatch(setName(e.target.value))
    }

    const handleRoomChange = (e) => {
        dispatch(setRoom(e.target.value))
    }
    return (
        <div className='joinRoomContainer'>
        <h3>"Click Here To Join"</h3>
        <Form>
        <Form.Field required>
            <label>Name: </label>
            <input placeholder='Name' name='name' onChange={(e) => handleNameChange(e)}/>
        </Form.Field>
        <Form.Field required>
            <label>Room ID: </label>
            <input placeholder='Room ID' name='room_id' onChange={(e) => handleRoomChange(e)}/>
        </Form.Field>
        <Link onClick={e => (!name || !room_id ? e.preventDefault() : null)} to={`/main-lobby?name=${name}&room=${room_id}`}>
        <Button>Join Room</Button>
        </Link>
        </Form>
        </div>
    )
}

export default JoinRoom