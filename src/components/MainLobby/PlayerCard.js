import React from 'react'


export const PlayerCard = (props) => {
    return (
            <li className='playerInfo'><img src='https://jackboxgames.com/wp-content/uploads/2019/07/Red.gif' alt='quiplash icon'></img><p className='playerNameCircle'>{props.player}</p></li>
    )
}
export default PlayerCard