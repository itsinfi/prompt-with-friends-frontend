import PropTypes from 'prop-types'
import './Score.css'
import PlayerAvatar from '../playerAvatar/PlayerAvatar'
import getPlayerAvatarColor from '../../utils/playerAvatarColors'


/**
 * Component for showing the result of a game
 * 
 * @param player player model of the creator of the generation
 * @param currentPlayerNumber number of current player (to show 'you' badge)
 * @returns 
 */
function Score({ player, currentPlayerNumber }) {

    const playerColor = getPlayerAvatarColor(player.playerNumber)

    return  <div style={{backgroundColor: playerColor}} className={'score'}>
                <div className='score-lighten p-20 flex-row jc-between ai-center'>

                    {/* Score */}
                    <p>{player.playerNumber}. Platz: Spieler{player.playerNumber} - {player.score} Punkte</p>

                    {/* Player Avatar */}
                    <div><PlayerAvatar player={ player } currentPlayerNumber={ currentPlayerNumber }/></div>
            
                </div>
            </div>

}

Score.propTypes = {
    player: PropTypes.object.isRequired,
    currentPlayerNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}


export default Score