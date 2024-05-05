import PropTypes from 'prop-types'
import './PlayerAvatar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import getPlayerAvatarColor from '../../utils/playerAvatarColors'



/**
 * A component that visualizes a player inside the session
 * 
 * @param name name of player 
 * @returns visualization of a player
 */
const PlayerAvatar = ({ player }) => {

    const playerColor = getPlayerAvatarColor(player.id)
    
    return  (   <>
        <div title={ player.isAdmin ? 'Admin' : '' } className='flex-column playerAvatar'>
            

            <FontAwesomeIcon style={{ color: player.isAdmin ? 'var(--warning)' : 'transparent' }} className='adminIcon' icon={faCrown} size='2x' />
            

            <FontAwesomeIcon style={{ color: playerColor }} className='playerIcon' icon={faUser} size='10x' />
            
                
            <h3 className='playerName'>
                {`Spieler${player.id}`}  
            </h3>
        </div>
                </>
            )
}

PlayerAvatar.propTypes = {
    player: PropTypes.object.isRequired,
}


export default PlayerAvatar