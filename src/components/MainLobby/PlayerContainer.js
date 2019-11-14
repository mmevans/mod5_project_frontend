import React from 'react'
import PlayerCard from './PlayerCard'
import './playerCircle.css'

export const PlayerContainer = (props) => {
    const players = props.players
   return (
       <div>
           <ul className='circle-container'>
               {players !== undefined ? players.map((player, i) => {
                   return <PlayerCard key={i} player={player}/>
               }) : <p>Nothing To See Here</p>}
           </ul>
       </div>
   )
}
export default PlayerContainer