import { GET_PLAYERS, SET_STAGE, START_GAME, CHANGE_PLAYER_VIEW, SET_QUESTIONS, UPDATE_ROUND_1, ADD_QUESTIONS, ADD_POINTS, SELECT_ROUND_WINNER, UPDATE_ROUND_1_QUESTIONS } from "../actions/types";

const initialState = {
  playerNames: [],
  playersInRoom: [],
  questions_round_1: null,
  questions_round_2: null,
  gameStarted: false,
  playerView: false,
  stage: 1,
  count_of_answers: 0,
  round_winner: '',
  round_winner_points: 0
}

function gameReducer(state = initialState, action) {
  switch (action.type) {
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
    case UPDATE_ROUND_1:
      return {
        ...state,
        selectedQuestion: action.selectedQuestion,
        playersInRoom: action.allPlayersInGame,
        questions_round_1: state.questions_round_1.map(question => {
          return {
            ...question, answers: action.allPlayersInGame
              .filter(player => question.players.includes(player.name))
              .map(player => {
                let indexOfQuestion = player.questions_round_1.findIndex(playerQuestion => playerQuestion.prompt === question.prompt)
                return player.answers_round_1[indexOfQuestion]
              })
          }
        })
      }
    case ADD_QUESTIONS:
      return {
        ...state,
        questions_round_1: action.questions_round_1,
        questions_round_2: action.question_round_2
      }
    case ADD_POINTS:
      if(state.count_of_answers <= state.playerNames.length) {
        if(state.questions_round_1[0].answers[0] === action.answer) {
          return {
          ...state,
          questions_round_1: state.questions_round_1.map(
            (question, i) => i === 0 ? {...question, points_player_1: state.questions_round_1[0].points_player_1 += 1} : question),
            count_of_answers: state.count_of_answers + 1
          }
        }
        if(state.questions_round_1[0].answers[1] === action.answer) {
          return  {
          ...state,
            questions_round_1: state.questions_round_1.map(
              (question, i) => i === 0 ? {...question, points_player_2: state.questions_round_1[0].points_player_2 += 1} : question),
              count_of_answers: state.count_of_answers + 1
          }
        }
      }
      if(state.count_of_answers <= (state.playerNames.length * 2) && state.selectedQuestion === 1) {
        if(state.questions_round_1[1].answers[0] === action.answer) {
          return {
            ...state,
            questions_round_1: state.questions_round_1.map(
              (question, i) => i === 1 ? {...question, points_player_1: state.questions_round_1[1].points_player_1 += 1} : question),
              count_of_answers: state.count_of_answers + 1
            }
        }
        if(state.questions_round_1[1].answers[1] === action.answer) {
          return {
            ...state,
            questions_round_1: state.questions_round_1.map(
              (question, i) => i === 1 ? {...question, points_player_2: state.questions_round_1[1].points_player_2 += 1} : question),
              count_of_answers: state.count_of_answers + 1
            }
        }
      }
    // eslint-disable-next-line no-fallthrough
    case SELECT_ROUND_WINNER:
      if(state.count_of_answers <= state.playerNames.length + 1) {
        debugger
        var winner = ''
        var winner_points = 0
        if(state.questions_round_1[0].points_player_1 > state.questions_round_1[0].points_player_2) {
          winner = state.questions_round_1[0].players[0]
          winner_points = state.questions_round_1[0].points_player_1
        } else {
          winner = state.questions_round_1[0].players[1]
          winner_points = state.questions_round_1[0].points_player_2
        }
      }
      if(state.count_of_answers >= 3 && state.count_of_answers <= (state.playerNames.length * 2) && state.selectedQuestion === 1) {
        var winner = ''
        var winner_points = 0
        if(state.questions_round_1[1].points_player_1 > state.questions_round_1[1].points_player_2) {
          winner = state.questions_round_1[1].players[0]
          winner_points = state.questions_round_1[1].points_player_1
        } else {
          winner = state.questions_round_1[1].players[1]
          winner_points = state.questions_round_1[1].points_player_2
        }
      }
      return {
        ...state,
        round_winner: winner,
        round_winner_points: winner_points
      }
    case UPDATE_ROUND_1_QUESTIONS:
      if(state.selectedQuestion === 0)
      return {
        ...state,
        selectedQuestion: 1
      }
    // eslint-disable-next-line no-fallthrough
    default:
  return {
    ...state
  }
}
}

export default gameReducer

