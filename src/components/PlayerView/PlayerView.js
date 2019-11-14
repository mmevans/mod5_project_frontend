import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import PlayerVotingScreen from './PlayerVotingScreen'
import io from 'socket.io-client';
import {setStage, updateAnswersForVoting, goToNextQuestion} from '../../actions/gameActions'
import {getPlayerInfo, addPlayerAnswers, updateAnswersToState} from '../../actions/playerActions'
import {Form, TextArea, Button} from 'semantic-ui-react'
import queryString from 'query-string';
import './PlayerView.css'
import socket from '../socket/socket'


export const PlayerView = (props) => {
    const {name, room, lobby} = queryString.parse(props.location.search)

    const dispatch = useDispatch();
    const stage = useSelector(state => state.game.stage);
    const prompt1 = useSelector(state => state.player.prompt1)
    const prompt2 = useSelector(state => state.player.prompt2)
    const prompt3 = useSelector(state => state.player.prompt3)
    const prompt4 = useSelector(state => state.player.prompt4)
    const prompt5 = useSelector(state => state.player.prompt5)
    const prompt6 = useSelector(state => state.player.prompt6)
    const answers_round_1 = useSelector(state => state.player.answers_round_1)
    const answers_round_2 = useSelector(state => state.player.answers_round_2)
    const answers_round_3 = useSelector(state => state.player.answers_round_3)

    const questions_round_1 = useSelector(state => state.game.questions_round_1)
    const selectedQuestion = useSelector(state => state.game.selectedQuestion)

    useEffect(() => {
        const timer = setTimeout(() => {
        dispatch(setStage())
        dispatch(getPlayerInfo(name, room))
        }, 20000);

        socket.on('ready-to-vote', ({ allPlayersInGame, selectedQuestion }) => {
            dispatch(updateAnswersForVoting(allPlayersInGame, selectedQuestion))
            dispatch(setStage())
        })


        return () => clearTimeout(timer);
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(stage === 2) {
            dispatch(updateAnswersToState(e.target[0].value, stage))
            dispatch(setStage())
            e.target.reset()
        }
        if(stage === 3) {
            dispatch(updateAnswersToState(e.target[0].value, stage))
            dispatch(setStage())
        }
    }

    useEffect(() => {
        if(answers_round_1.length === 2) {
            dispatch(addPlayerAnswers(name, room, stage, answers_round_1))
        }
     
    }, [answers_round_1])

    useEffect(() => {
        socket.on('cast-go-to-next-question', () => {
            dispatch(goToNextQuestion())
        })
    })

    if(stage === 1) {
        return (
            <div className='playerViewPage'>
                <h1>Get Ready!</h1>
            </div>
        )
    }
    if(stage === 2) {
        return (
        <div>
            <div className='playerQuestionForm'>
                <h1>{prompt1 !== undefined ? prompt1 : null}</h1>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <TextArea placeholder='Answer'/>
                        <Button fluid color='red'>Next Question</Button>
                    </Form>
            </div>
            <div className='playerScreenFriend'>
                <img src='https://jackboxgames.com/wp-content/uploads/2019/07/Blue.gif' alt='happy quiplash guy'></img>
            </div>
        </div>
        )  
    }
    if(stage === 3) {
        return (
            <div>
            <div className='playerQuestionForm'>
                <h1>{prompt2 !== undefined ? prompt2 : null}</h1>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <TextArea placeholder='Answer'/>
                        <Button fluid color='red'>Submit</Button>
                    </Form>
            </div>
            <div className='playerScreenFriend'>
                <img src='https://jackboxgames.com/wp-content/uploads/2019/07/Blue.gif' alt='happy quiplash guy'></img>
            </div>
        </div>
        )
    }
    if(stage === 4) {
        return (
            <div class='waitingScreenInGame'>
                <h2>Waiting on other players</h2>
            </div>
        )
    }
    if(stage === 5) {
        return (
            <PlayerVotingScreen questions_round_1={questions_round_1} selectedQuestion={selectedQuestion} room={room}/>
        )
    }
    return (
        <div>
            <h1>Get Ready!</h1> 
        </div>
        //STYLE THIS SHIT
    )
}

export default PlayerView