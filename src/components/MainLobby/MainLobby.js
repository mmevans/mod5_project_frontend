import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import {getPlayersInRoom, startingGame, changePlayerView, generateQuestions, saveQuestions} from '../../actions/gameActions'
import PlayerContainer from './PlayerContainer'
import {Button} from 'semantic-ui-react'
import Game from '../Game/Game'
import PlayerView from '../PlayerView/PlayerView'
import socket from '../socket/socket'
import './mainlobby.css'


export const MainLobby = (props) => {
    const dispatch = useDispatch();
    const goToLobby = useSelector(state => state.userHome.goToLobby)
    const playerNames = useSelector(state => state.game.playerNames)
    const gameStarted = useSelector(state => state.game.gameStarted)
    const playerView = useSelector(state => state.game.playerView)
    const playersInRoom = useSelector(state => state.game.playersInRoom)
    const {name, room, lobby} = queryString.parse(props.location.search)

    useEffect(() => {
        if(goToLobby || lobby ) {
            socket.emit('create-game', {name, room}, () => {})
        } else {
            socket.emit('join', {name, room}, () => {
            }) 
        }
    })

    useEffect(() => {
        socket.on('get-players-in-room', async (room, callback) => {
            dispatch(getPlayersInRoom(room))
        })
    })

    useEffect(() => {
        socket.on('change-player-view', (questions) => {
            dispatch(saveQuestions)
            dispatch(changePlayerView())
            dispatch(saveQuestions(questions))
        })
    }, [])

    const startGame = () => {
        const {room} = queryString.parse(props.location.search)
        dispatch(startingGame())
        dispatch(generateQuestions(room))
    } 
  

    if((goToLobby || lobby)  && gameStarted === false) {
        return (
            <div>
                <div className='main-lobby-screen'>
                    <div className='roomIDBox'>
                        <p> Room ID: {room}</p>
                        </div>
                    <PlayerContainer players={playerNames}/>
                    <div>
                        <div className='startGameButton'>
                            <Button size='massive' onClick={() => startGame()}>Start Game</Button>
                        </div>
                        <div>
                        </div>
                    </div>
                    </div>
            </div>
    )
    }   else if (gameStarted === true) {
        return (
            <div>
                <Game/>
             </div>
        
        )
    } else if (playerView === true) {
        return (
            <PlayerView players = {playersInRoom} location={props.location}/>
        )
    }
        return (
            <div class='waitingScreen'>
                <h1>Waiting For Other Players</h1>
            </div>
        )
    }
export default MainLobby