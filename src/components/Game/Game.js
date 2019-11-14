import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Game.css'
import '../Timer/loadingCircle.css'
import { setStage, updateAnswersForVoting, addPoints, resetPointsPlayer1} from '../../actions/gameActions'
import { setIsActive, setSeconds } from '../../actions/timerActions'
import Timer from '../Timer/Timer'
import { QuestionScreen } from './QuestionScreen';
import socket from '../socket/socket'


export const Game = (props) => {

    const dispatch = useDispatch();
    const stage = useSelector(state => state.game.stage);
    const isActive = useSelector(state => state.timer.isActive)
    const seconds = useSelector(state => state.timer.seconds)
    const playersInRoom = useSelector(state => state.game.playersInRoom)
    const count_of_answers = useSelector(state => state.player.count_of_answers)
    const questions_round_1 = useSelector(state => state.game.questions_round_1)
    const selectedQuestion = useSelector(state => state.game.selectedQuestion)
    const round_winner = useSelector(state => state.game.round_winner)
    const round_winner_points = useSelector(state => state.game.round_winner_points)

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setStage())
            dispatch(setIsActive())
            dispatch(setSeconds(60))
            // give all the players their prompts to answer on screen
        }, 20000);
        socket.on('ready-to-vote', ({ allPlayersInGame, selectedQuestion }) => {
            dispatch(setIsActive())
            dispatch(updateAnswersForVoting(allPlayersInGame, selectedQuestion))
            dispatch(resetPointsPlayer1())
            dispatch(setStage())
        })
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        socket.on('cast-vote-round-1-to-host', (answer, callback) => {
            console.log("ANSWER",answer)
            dispatch(addPoints(answer))
        })
        
    }, [count_of_answers])




    if (stage === 1) {
        return (
            <div className='main-container'>
            <div class="sp-container">
                <div class="sp-content">
                    <h2 class="frame-1">Each player will be given random prompts to answer each round</h2>
                    <h2 class="frame-2">After each round of answers, you will vote on the best answer for each prompt!</h2>
                    <h2 class="frame-3">You will have 60 seconds for each round! </h2>
                    <h2 class="frame-4">Good Luck!</h2>
                </div>
            </div>
        </div>
        )
    }
    if (stage === 2) {
        return (
        <div className='timer-container'>
                <Timer />
            <div className='loading-container'>
                <div class="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                </div>
        </div>
        )
    }
    if (stage === 3) {
        return (
            <QuestionScreen questions_round_1={questions_round_1} selectedQuestion={selectedQuestion} round_winner={round_winner} round_winner_points={round_winner_points}/>
        )
    }
    if(stage === 4) {
        return (
            <div>
                <h1>Next round of questions go here!</h1>
            </div>   
        )
    }
    return (
        <div className='game-container'>
        </div>
    )
}

export default Game