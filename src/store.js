import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [
      'gameReducer',
      'landing'
    ],
    blacklist: [
        'userHome',
        'joinRoom'
    ]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(
    persistedReducer, 
    compose(
    applyMiddleware(...middleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
      ? a => a
      : window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

//Middleware: Redux Persist Persiter
let persistor = persistStore(store)



export {
    store,
    persistor
}
