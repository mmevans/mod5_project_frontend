import {SET_PROMPTS, GET_PLAYER_INFO, UPDATE_ANSWERS_TO_STATE} from './types'

export const setPrompts = (player) => dispatch => {
    dispatch({
        type: SET_PROMPTS,
        action: player
    })
}

export const getPlayerInfo = (playerName, room) => async dispatch => {
    const url = 'http://localhost:3000/players-in-game'
    const res = await fetch(url)
    const players = await res.json()
    var prompts = [];

    players.forEach((player) => {
        if(player.name === playerName && player.room_id === room) {
            prompts.push(player.questions_round_1[0].prompt, player.questions_round_1[1].prompt, player.questions_round_2[0].prompt, player.questions_round_2[1].prompt, player.questions_round_3[0].prompt, player.questions_round_3[1].prompt)
        }
    })
    dispatch({
        type: GET_PLAYER_INFO,
        prompts
    })
}

export const addPlayerAnswers = (playerName, room, stage, answers_round_1) => async dispatch => {
    console.log(answers_round_1)
    const url = 'http://localhost:3000/update-player-answers'
    const settings = {
        method: 'PATCH',
        headers: 
            {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({playerName, room, stage, answers_round_1})
    }
    const updatingPlayers = await fetch(url, settings)
}

export const updateAnswersToState = (answer, stage) => dispatch => {
    dispatch({
        type: UPDATE_ANSWERS_TO_STATE,
        answer,
        stage
    })
}
