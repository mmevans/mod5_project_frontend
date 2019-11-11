import {combineReducers} from 'redux'
import joinRoom from './joinReducer'
import userHome from './userHomepageReducer'
import gameReducer from './gameReducer'
import landingPageReducer from './landingPageReducer'
import timerReducer from './timerReducer'
import playerReducer from './playerReducer'



export default combineReducers({
    joinRoom: joinRoom,
    userHome: userHome,
    game: gameReducer,
    landing: landingPageReducer,
    timer: timerReducer,
    player: playerReducer
})

