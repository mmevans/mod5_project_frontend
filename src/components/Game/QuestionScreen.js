import React, { useEffect } from 'react';
import Winner from './Winner'
import {Button} from 'semantic-ui-react'
import './votingScreenRound1.css'
import {determineWinner, goToNextQuestion} from '../../actions/gameActions'
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket/socket'


export const QuestionScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('cast-go-to-next-question', (callback) => {
            dispatch(goToNextQuestion())
        })
    })

    const getRoundWinner = () => {
        dispatch(determineWinner())
    } 

    const goToNextRound = () => {
            socket.emit('go-to-next-question', () => {})

    }

    return (
        <div className='votingScreenRound1'>
          <div>
            <h1>{props.questions_round_1[props.selectedQuestion].prompt}</h1> 
          </div>
            <h2 className='answer1Round1'>Answer 1</h2>
            <h2 className='answer2Round1'>Answer 2</h2>
            {props.questions_round_1[props.selectedQuestion].answers.map((answer,i) => (
                <div>
                    <p className={`speech${i}`}>{answer}</p>
                </div>
            ))}
            <Winner winner={props.round_winner} points={props.round_winner_points}/>
            <img className='redRound1Voting' src='https://jackboxgames.com/wp-content/uploads/2019/07/Red.gif' alt='quiplash icon'></img>
            <img className='blueRound1Voting' src='https://jackboxgames.com/wp-content/uploads/2019/07/Blue.gif' alt='quiplash icon'></img>
            <Button className='getRoundWinner' size='medium' color='grey' onClick={() => getRoundWinner()}>Get Winner</Button>
            <Button className='nextRound' onClick={() => goToNextRound()}>Next Round</Button>
        </div>
    )

}

export default QuestionScreen