import { GET_PLAYERS, SET_STAGE, START_GAME, CHANGE_PLAYER_VIEW, ADD_ANSWERS, UPDATE_ROUND_1, ADD_QUESTIONS, ADD_POINTS, SELECT_ROUND_WINNER, UPDATE_ROUND_1_QUESTIONS, RESET_POINTS_BEFORE_ROUND} from './types'

export const getPlayersInRoom = (room_id) => async dispatch => {
    const url = `http://localhost:3000/players-in-room/${room_id}`
    var res = await fetch(url)
    var players = await res.json();
    var playerNames = [];
    players.map((player) => (
        playerNames.push(player.name)
    ))
    dispatch({
        type: GET_PLAYERS,
        playerNames,
        players
    })
}

export const setStage = () => dispatch => {
    dispatch({
        type: SET_STAGE
    })
}

export const startingGame = () => dispatch =>  {
    dispatch({
        type: START_GAME
    })
}

export const changePlayerView = () => dispatch => {
    dispatch({
        type: CHANGE_PLAYER_VIEW
    })
}

export const generateQuestions = (room) => async dispatch => {

    const url = 'http://localhost:3000/generate-questions'
    var res = await fetch(url, { 
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            room
        })
    })
    var { questions_round_1, questions_round_2} = await res.json();

    dispatch({
        type: ADD_QUESTIONS,
        questions_round_1,
        questions_round_2
    })
}

export const saveQuestions = ({ questions_round_1, questions_round_2 }) => dispatch => {
    dispatch({
        type: ADD_QUESTIONS,
        questions_round_1,
        questions_round_2
    })
}

export const addPlayersAnswers = (player) => dispatch => {
    dispatch({
        type: ADD_ANSWERS,
        player
    })
}

export const updateAnswersForVoting = (allPlayersInGame, selectedQuestion) => dispatch => {
    dispatch({
        type: UPDATE_ROUND_1,
        allPlayersInGame,
        selectedQuestion
    })
}

export const addPoints = (answer) => dispatch => {
    dispatch({
        type: ADD_POINTS,
        answer
    })
}

export const determineWinner = () => dispatch => {
    dispatch({
        type: SELECT_ROUND_WINNER
    })
}

export const goToNextQuestion = () => dispatch => {
    dispatch({
        type: UPDATE_ROUND_1_QUESTIONS
    })
}

export const resetPointsPlayer1 = () => dispatch => {
    dispatch({
        type: RESET_POINTS_BEFORE_ROUND
    })
}