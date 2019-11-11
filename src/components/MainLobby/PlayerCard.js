import React from 'react'


export const PlayerCard = (props) => {
    return (
            <li className='playerInfo'><img src='https://sanin.dev/assets/thumbnails/quiplash.png' alt='quiplash icon'></img><p>{props.player}</p></li>
    )
}
export default PlayerCard