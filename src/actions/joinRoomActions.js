import { SET_ROOM, GO_TO_LOBBY, GENERATE_ROOM_ID, SET_NAME} from './types'

export const setName = (name) => dispatch => {
    dispatch({
        type: SET_NAME,
        payload: name
    })
}


export const setRoom = (room_id) => dispatch => {
    dispatch({
        type: SET_ROOM,
        payload: room_id
    })
}

export const goToLobby = () => dispatch => {
    dispatch({
        type: GO_TO_LOBBY
    })
}

export const generateRoomID = (length) => dispatch => {
    var result                  = '';
    var characters              = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength        = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    dispatch({
        type: GENERATE_ROOM_ID,
        payload: result
    })
}