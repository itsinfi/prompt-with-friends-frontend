import PropTypes from 'prop-types'
import './RoundResult.css'
import Card from '../card/Card'
import PromptTextArea from '../promptTextArea/PromptTextArea'
import Score from '../score/Score'


/**
 * Component for showing the result of a game
 * 
 * @param result result model of the result to show
 * @param player player model of the creator of the generation
 * @param onVote callback function to execute when clicking on vote button
 * @param disableMargin disable margin of card (same property for card)
 * @param isSelected whether this vote is selected or not (will use visual highlighting to indicate selection if true)
 * @param showScore shows data related to scoring for leaderboard (score, position, user name)
 * @param currentPlayerNumber number of current player (to show 'you' badge) (only required if showScore = true)
 * @returns 
 */
function RoundResult({ result, player, onVote = null, disableMargin = true, isSelected = false, showScore = false, currentPlayerNumber }) {

    return <div className={isSelected ? 'selected-vote' : ''}>
                <Card disableMargin={disableMargin} isSelected={isSelected}>  
                    
                    {/* Score (if enabled) */}
                    {showScore ? <Score player={ player } currentPlayerNumber={ currentPlayerNumber }/> 
                                
                                : <></>
                    }

            

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


                    {/* Vote button (show only if onVote has been provided) */}
                    {
                        onVote ? <button className='m-20' onClick={() => {onVote(player)}}>
                                    Vote
                                </button>
                                :   <></>
                    }

                </Card>
            </div>

}

RoundResult.propTypes = {
    result: PropTypes.object,
    player: PropTypes.object.isRequired,
    onVote: PropTypes.func,
    disableMargin: PropTypes.bool,
    isSelected: PropTypes.bool,
    showScore: PropTypes.bool,
    currentPlayerNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}


export default RoundResult