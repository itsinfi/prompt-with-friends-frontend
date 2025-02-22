import PropTypes from 'prop-types'
import './PlayerAvatar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import getPlayerAvatarColor from '../../utils/playerAvatarColors'



/**
 * A component that visualizes a player inside the session
 * 
 * @param player player to visualizes
 * @param currentPlayerNumber number of current player (to show 'you' badge)
 * @param position position of player (optional and only relevant for crown icon)
 * @returns visualization of a player
 */
const PlayerAvatar = ({ player, currentPlayerNumber, position = 0 }) => {

    const playerColor = getPlayerAvatarColor(player.playerNumber)
    
    return  (
        <div title={ player.isHost ? 'Host' : 'Spieler' } className='flex-column playerAvatar'>
            
            <FontAwesomeIcon style={{ color: position == 1 ? 'var(--warning)' : 'transparent' }} className='adminIcon' icon={faCrown} size='2x' />
            

            <FontAwesomeIcon style={{ color: playerColor }} className='playerIcon' icon={faUser} size='7x' />
            
                
            <h3 className='playerName'>
                {`Spieler ${player.playerNumber}${player.isHost ? ' (Host)' : ''} ${player.playerNumber.toString() === currentPlayerNumber.toString() ? ' (Du)' : ''}`}  
            </h3>
        </div>
            )
}

PlayerAvatar.propTypes = {
    player: PropTypes.object.isRequired,
    currentPlayerNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    position: PropTypes.number,
}


export default PlayerAvatar