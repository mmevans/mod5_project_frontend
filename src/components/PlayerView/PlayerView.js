import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';
import {setStage} from '../../actions/gameActions'
import {setPrompts} from '../../actions/playerActions'


let socket;
const ENDPOINT = 'localhost:3000'

export const PlayerView = (props) => {

    const dispatch = useDispatch();
    const room = useSelector(state => state.joinRoom.room_id)
    const stage = useSelector(state => state.game.stage);
    const playerName = useSelector(state => state.joinRoom.name)
    const prompt1 = useSelector(state => state.player.prompt1)
    const prompt2 = useSelector(state => state.player.prompt2)
    const prompt3 = useSelector(state => state.player.prompt3)
    const prompt4 = useSelector(state => state.player.prompt4)
    const prompt5 = useSelector(state => state.player.prompt5)
    const prompt6 = useSelector(state => state.player.prompt6)


    useEffect(() => {
        props.players.forEach((player) => {
            if(player.name === playerName) {
                dispatch(setPrompts(player))
            }
        })
    }, [])


    useEffect(() => {
        console.log('does this hit?')
        const timer = setTimeout(() => {
          dispatch(setStage())
        }, 5000);
        return () => clearTimeout(timer);
      }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        let answers_round_1 = [];
        if(stage === 2) {
            dispatch(setStage())
            answers_round_1.push(e.target.answer.value)
        }
        if(stage === 3) {
            answers_round_1.push(e.target.answer2.value)
            socket.emit('send-answers-to-host', {answers_round_1,room, playerName}, () => {})
            dispatch(setStage())
        }
    }

    if(stage === 1) {
        return (
            <div>
                <h1>Get Ready!</h1>
            </div>
        )
    }
    if(stage === 2) {
        return (
            <div>
                <h1>{prompt1}</h1> 
                <form onSubmit={(e) => handleSubmit(e)}>
                    <textarea row='4' cols='50' name='answer1'>
                    </textarea>
                    <button>Next Question!</button>
                </form>
            </div>
        )  
    }
    if(stage === 3) {
        return (
            <div>
            <h1>{prompt2}</h1> 
            <form onSubmit={(e) => handleSubmit(e)}>
                <textarea row='4' cols='50' name='answer2'>
                </textarea>
                <button>Submit</button>
            </form>
        </div> 
        )
    }
    if(stage === 4) {
        return (
            <div>
                <h2>Waiting on other players...</h2>
            </div>
        )
    }
    return (
        <div>
            <h1>Get Ready!</h1> 
        </div>
    )
}

export default PlayerView