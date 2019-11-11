import {SET_PROMPTS} from '../actions/types'
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';


const initialState = {
    prompt1: '',
    prompt2: '',
    prompt3: '',
    prompt4: '',
    prompt5: '',
    prompt6: ''

}


function playerReducer(state = initialState, action) {
    switch(action.type) {
        case SET_PROMPTS:
            return {
                ...state,
                prompt1: action.player.questions_round_1[0],
                prompt2: action.player.questions_round_1[1],
                prompt3: action.player.questions_round_2[0],
                prompt4: action.player.questions_round_2[1],
                prompt5: action.player.questions_round_3[0],
                prompt6: action.player.questions_round_3[1]
            }
        default:
          return {
            ...state
        }
    }
}

export default playerReducer