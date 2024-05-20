import PropTypes from 'prop-types'
import './RoundResult.css'
import Card from '../card/Card'
import PromptTextArea from '../promptTextArea/PromptTextArea'


/**
 * Component for showing the result of a game
 * 
 * @param result result model of the result to show
 * @param player player model of the creator of the generation
 * @param onVote callback function to execute when clicking on vote button
 * @param isSelected whether this vote is selected or not (will use visual highlighting to indicate selection if true)
 * @returns 
 */
function RoundResult({ result, player, onVote = () => {}, isSelected = false }) {
    
    console.log(`${player.playerNumber}: ${isSelected}`)

    return <div className={isSelected ? 'selected-vote' : ''}>
                <Card disableMargin={ true } isSelected={ isSelected }>  

                    {/* Result preview */}
                    <h3 className='t-align-l ph-20'>Eingabe</h3>
                    <PromptTextArea
                        placeholder=''
                        initialValue={result != null ? result.prompt : ''}
                    />


                    <div className='mv-40' />    


                    {/* Prompt input form */}
                    <h3 className='t-align-l ph-20'>Ausgabe</h3>
                    <PromptTextArea
                        placeholder=''
                        initialValue={result != null ? result.result : ''}
                    />


                    {/* Vote button */}
                    <button className='m-20' onClick={() => {onVote(player)}}>
                        Vote
                    </button>

                </Card>
            </div>

}

RoundResult.propTypes = {
    result: PropTypes.object,
    player: PropTypes.object.isRequired,
    onVote: PropTypes.func,
    isSelected: PropTypes.bool
}


export default RoundResult