import { GET_PLAYERS, SET_STAGE, START_GAME, CHANGE_PLAYER_VIEW, SET_QUESTIONS, ADD_ANSWERS} from './types'

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

export const generateQuestionsForRound = (room) => async dispatch => {

    const url = 'http://localhost:3000/collectioncards'
    var res = await fetch(url)
    var questions = await res.json();

    const url2 = 'http://localhost:3000/players-in-game/'
    var res2 = await fetch(url2)
    var allPlayers = await res2.json()

    var playersInRoom = allPlayers.filter((player) => player.room_id === room)


    var count = 0;

    playersInRoom.forEach((player) => {
            player.questions_round_1 = [];
            player.questions_round_2 = [];
            player.questions_round_3 = [];
            player.answers_round_1 = [];
            player.answers_round_2 = [];
            player.answers_round_3 = [];
    })
    while(count !== (playersInRoom.length)) {
        var user1 = playersInRoom[Math.floor(Math.random() * playersInRoom.length)]
        var user2 = playersInRoom[Math.floor(Math.random() * playersInRoom.length)]
        if(user1.name === user2.name || user1.questions_round_1.length === 2 || user2.questions_round_1.length === 2  || ((user1.questions_round_1[user1.questions_round_1.length-1] === user2.questions_round_1[user2.questions_round_1.length-1]) && user1.questions_round_1[0] !== undefined)) {
            continue
        }
        user1.questions_round_1.push(questions[Math.floor(Math.random() * questions.length)])
        var addedQuestion = user1.questions_round_1[user1.questions_round_1.length-1]
        var index = questions.indexOf(addedQuestion)
        questions.splice(index, 1)
        user2.questions_round_1.push(user1.questions_round_1[user1.questions_round_1.length-1])
        // eslint-disable-next-line no-loop-func
        playersInRoom.forEach((player) => {
            if(user1.name === player.name) {
                player.questions_round_1 = user1.questions_round_1
            }
            if(user2.name === player.name) {
                player.questions_round_1 = user2.questions_round_1
            }
        })
        count++;
    }

    var count2 = 0
    while(count2 !== (playersInRoom.length)) {
         user1 = playersInRoom[Math.floor(Math.random() * playersInRoom.length)]
         user2 = playersInRoom[Math.floor(Math.random() * playersInRoom.length)]
        if(user1.name === user2.name || user1.questions_round_2.length === 2 || user2.questions_round_2.length === 2  || ((user1.questions_round_2[user1.questions_round_2.length-1] === user2.questions_round_2[user2.questions_round_2.length-1]) && user1.questions_round_2[0] !== undefined)) {
            continue
        }
        user1.questions_round_2.push(questions[Math.floor(Math.random() * questions.length)])
        addedQuestion = user1.questions_round_2[user1.questions_round_2.length-1]
        index = questions.indexOf(addedQuestion)
        questions.splice(index, 1)
        user2.questions_round_2.push(user1.questions_round_2[user1.questions_round_2.length-1])
        // eslint-disable-next-line no-loop-func
        playersInRoom.forEach((player) => {
            if(user1.name === player.name) {
                player.questions_round_2 = user1.questions_round_2
            }
            if(user2.name === player.name) {
                player.questions_round_2 = user2.questions_round_2
            }
        })
        count2++;
    }
    playersInRoom.forEach((player) => {
        player.questions_round_3.push(questions[0], questions[1])
    })

    const url3 = 'http://localhost:3000/update-players'
    const settings = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({playersInRoom})
    }
    var res3 = await fetch(url3, settings)
    var updatedPlayers = await res3.json()
    debugger
    dispatch({
        type: SET_QUESTIONS,
        updatedPlayers
    })
}

export const addPlayersAnswers = (player) => dispatch => {
    console.log('This object player', player)
    dispatch({
        type: ADD_ANSWERS,
        player
    })

}