import React from 'react'
import {Button} from 'semantic-ui-react'
import io from 'socket.io-client';
import $ from 'jquery'
import socket from '../socket/socket'



export const PlayerVotingScreen = (props) => {

    
    const submitAnswer = (answer) => {
        $(".voting-buttons").hide()
        socket.emit('cast-vote-round-1', answer, props.room, () => {
        })
    }

    socket.on('cast-go-to-next-question', () => {
        $(".voting-buttons").show()
    })

    return (
        <div className='votingScreen'>
        <h1>Cast Your Vote Now!</h1>
        <div className='voting-buttons'>
            {props.questions_round_1[props.selectedQuestion].answers.map( (answer, i) => (
                <Button size='massive' className={`answer${i}`}onClick={(e) => submitAnswer(answer)}> Answer {i + 1} </Button>
            ))}
            <h1 id='votingOR'>OR</h1>
        </div>
    </div>
    )
}

export default PlayerVotingScreen