
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import io from 'socket.io-client';
import {getPlayersInRoom, startingGame, changePlayerView, generateQuestionsForRound} from '../../actions/gameActions'
import PlayerContainer from './PlayerContainer'
import {Button} from 'semantic-ui-react'
import Game from '../Game/Game'
import PlayerView from '../PlayerView/PlayerView'


let socket;
const ENDPOINT = 'localhost:3000'

export const MainLobby = (props) => {
    const dispatch = useDispatch();
    const goToLobby = useSelector(state => state.userHome.goToLobby)
    const playerNames = useSelector(state => state.game.playerNames)
    const gameStarted = useSelector(state => state.game.gameStarted)
    const playerView = useSelector(state => state.game.playerView)
    const playersInRoom = useSelector(state => state.game.playersInRoom)
    
    useEffect(() => {
        const {name, room} = queryString.parse(props.location.search)
        socket = io(ENDPOINT)
        if(goToLobby === true) {
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
        socket.on('change-player-view', (callback) => {
            dispatch(changePlayerView())
        })
    })

    const startGame = () => {
        socket = io(ENDPOINT);
        const {room} = queryString.parse(props.location.search)
        dispatch(startingGame())
        dispatch(generateQuestionsForRound(room))
        socket.emit('game-started', room, () => {})
    } 
  

    if(goToLobby === true && gameStarted === false) {
        return (
            <div>
                <div className='main-lobby-screen'>
                    <p> Users currently in the lobby Max 8</p>
                    <PlayerContainer players={playerNames}/>
                </div>
            <div>
                <Button onClick={() => startGame()}>Start Game</Button>
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
            <PlayerView players = {playersInRoom}/>
        )
    }
        return (
            <div>
                <p>Waiting To Start The Game!</p>
            </div>
        )
    }
export default MainLobby