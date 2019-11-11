import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';
import './Game.css'
import {setStage, addPlayersAnswers} from '../../actions/gameActions'
import {setIsActive, setSeconds} from '../../actions/timerActions'
import Timer from '../Timer/Timer'

let socket;
const ENDPOINT = 'localhost:3000'



export const Game = (props) => {
    const dispatch = useDispatch();
    const stage = useSelector(state => state.game.stage);

    useEffect(() => {
        const timer = setTimeout(() => {
          dispatch(setStage())
          dispatch(setIsActive())
          dispatch(setSeconds(80))
          // give all the players their prompts to answer on screen
        }, 5000);
        return () => clearTimeout(timer);
      }, []);

      useEffect(() => {
        socket = io(ENDPOINT);
        socket.on('get-answer-from-player',(player, callback) => {
            dispatch(addPlayersAnswers(player))
        })
      })

    

    if(stage === 1) {
        return (
        <div>
            <p>Here are the Rules</p>
            <p> Each player will be given a prompt to answer. When everyone is done answering, </p>
            <p> You will vote on your favorite answers!</p>
        </div>
        )
    }
    if(stage === 2) {
        return (
            <div>
                <Timer/>
            </div>
        )
    }
    return (
        <div className='game-container'>
            <div><p>Timer: </p></div>

            <div><p>Question:</p></div>
            <h1>The Game</h1>
        </div>
    )
}

export default Game