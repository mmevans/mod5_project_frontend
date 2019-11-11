import { GET_PLAYERS, SET_STAGE, START_GAME, CHANGE_PLAYER_VIEW, SET_QUESTIONS, ADD_ANSWERS } from "../actions/types";

const initialState = {
    playerNames: [],
    playersInRoom: [],
    gameStarted: false,
    playerView: false,
    stage: 1
}

function gameReducer (state = initialState, action) {
    switch(action.type) {
        case GET_PLAYERS:
          return {
            ...state,
            playerNames: action.playerNames,
            playersInRoom: action.players
          }
        case SET_STAGE:
          return {
            ...state,
            stage: state.stage + 1
          }
        case START_GAME:
          return {
            ...state,
            gameStarted: true
          }
        case CHANGE_PLAYER_VIEW:
          return {
            ...state,
            playerView: true
          }
        case SET_QUESTIONS:
          return {
            ...state,
            playersInRoom: action.updatedPlayers
          }
        case ADD_ANSWERS:
          return {
            ...state,
            playersInRoom: state.playersInRoom.map(
              (p) => p.name === action.player.playerName ? {...p, answers_round_1: action.player.answers} : p
            )
          }
        default:
          return {
            ...state
          }
    }
}

export default gameReducer