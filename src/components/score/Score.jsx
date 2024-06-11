import PropTypes from 'prop-types'
import './Score.css'
import PlayerAvatar from '../playerAvatar/PlayerAvatar'
import getPlayerAvatarColor from '../../utils/playerAvatarColors'


/**
 * Component for showing the result of a game
 * 
 * @param player player model of the creator of the generation
 * @param currentPlayerNumber number of current player (to show 'you' badge)
 * @param scoreIncrease amount of score increase this round
 * @param position position of player/result
 * @returns 
 */
function Score({ player, currentPlayerNumber, scoreIncrease, position }) {

    const playerColor = getPlayerAvatarColor(player.playerNumber)

    return  <div style={{backgroundColor: playerColor}} className={'score'}>
                <div className='score-lighten ph-40 flex-row jc-between ai-center'>


                    <h1 style={{fontSize: '128px', margin: 0}}>{ position }.</h1>

                    {/* Score */}
                    <div className='flex-column ai-center'>

                        <h1 style={{margin: 0}}>+{scoreIncrease} Punkte</h1>

                        <p style={{margin: 0}}>insgesamt: {player.score} Punkte</p>

                    </div>

                    {/* Player Avatar */}
                    <div><PlayerAvatar player={ player } currentPlayerNumber={ currentPlayerNumber } position={position}/></div>
            
                </div>
            </div>

}

Score.propTypes = {
    player: PropTypes.object.isRequired,
    currentPlayerNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    scoreIncrease: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired
}


export default Score