import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'


function saveToLocalStorage(state) {
    try {
        localStorage.setItem('token', state.signup.user.token)
        localStorage.setItem('user_id', state.signup.user.id)
        localStorage.setItem('isLoggedIn', state.signup.IsLoggedIn)
    } catch(e) {
        console.log(e)
    }
}

const middleware = [thunk];


const store = createStore(
    rootReducer, 
    compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)


store.subscribe(() => saveToLocalStorage(store.getState()))
export default store;