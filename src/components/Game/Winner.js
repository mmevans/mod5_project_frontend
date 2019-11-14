import React from 'react'


export const Winner = (props) => {


    return (
        <div>
            {props.winner === '' ? <p></p> : <div className='roundWinner'>The Winner: {props.winner} with {props.points} points!</div>}
        </div>
    )
}

export default Winner 


// to help dtermine the winner, have a conditional that points to the correct answer somehow