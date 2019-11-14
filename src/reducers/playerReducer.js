/* eslint-disable no-fallthrough */
import {GET_PLAYER_INFO, UPDATE_ANSWERS_TO_STATE, COUNT_OF_ANSWERS} from '../actions/types'
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';


const initialState = {
    prompt1: '',
    prompt2: '',
    prompt3: '',
    prompt4: '',
    prompt5: '',
    prompt6: '',
    answers_round_1: [],
    answers_round_2: [],
    answers_round_3: [],
    count_of_answers: 0
}


function playerReducer(state = initialState, action) {
    switch(action.type) {
        case GET_PLAYER_INFO:
            return {
                ...state,
                prompt1: action.prompts[0],
                prompt2: action.prompts[1],
                prompt3: action.prompts[2],
                prompt4: action.prompts[3],
                prompt5: action.prompts[4],
                prompt6: action.prompts[5],
            }
        case UPDATE_ANSWERS_TO_STATE:
            if(action.stage === 2) {
                return {
                    ...state,
                    answers_round_1: [...state.answers_round_1, action.answer]
                }
            }
            if(action.stage === 3) {
                return {
                    ...state,
                    answers_round_1: [...state.answers_round_1, action.answer]
                }
            }
        default:
          return {
            ...state
        }
    }
}

export default playerReducer