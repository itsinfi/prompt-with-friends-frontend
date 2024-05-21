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


                    {/* TODO: change to position */}
                    <h1 style={{fontSize: '128px', margin: 0}}>{ player.playerNumber }.</h1>

                    {/* Score */}
                    <div className='flex-column ai-center'>

                        {/* TODO: change to position */}
                        <h1 style={{margin: 0}}>+{player.score} Punkte</h1>

                        <p style={{margin: 0}}>insgesamt: {player.score} Punkte</p>

                    </div>

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