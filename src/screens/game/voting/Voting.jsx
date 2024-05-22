import './Voting.css'
import { Outlet } from 'react-router-dom'
import Card from '../../../components/card/Card'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner'
import TaskDescription from '../../../components/task/TaskDescription'
import Timer from '../../../components/timer/Timer'
import RoundResult from '../../../components/roundResult/RoundResult'



/**
 * The page where the actual game in form of communication with the api takes place.
 * 
 * @param config Config of the frontend
 * @param socket Socket client object
 * @param session Session client connected to
 * @param currentPlayer Model of current player
 * @param players Array of all players in the session
 * @returns 
 */
function VotingPage({ socket, players, round }) {

    // Result Model
    // const [result, setResult] = useState(null)
    const result = { prompt: 'Erstelle einen Brief für deinen Vorgesetzen, welcher 300 Wörter lang ist.', result: 'Erstelle einen Brief für deinen Vorgesetzen, welcher 300 Wörter lang ist.' }

    // playerNumber that is selected for vote
    const [selectedNumber, setSelectedNumber] = useState(null)


    // change vote
    const onVote = (player) => {
        setSelectedNumber(player.playerNumber)
    }



    return (
        <>
            {   //check if socket connection has been established + players are loaded
                !socket && !players ? <LoadingSpinner />
                
                    : (
            
                    <>
                        
                        <Card >
                                
                            {/*Game progress*/}
                            <div className='flex-row jc-around'>
                                <h1>Voting</h1>
                                    
                                <Timer seconds={round.time} label='bis zu den Ergebnissen'/>   
                            </div>

                            {/*Task description*/}
                            <TaskDescription description={round.task} />
                                

                        </Card>
                            {/*Results*/}
                            <div className='grid-container'>
                                    
                                {
                                    players.map(player => (
                                        <RoundResult
                                            key={player.playerNumber}
                                            player={player}
                                            result={result}
                                            onVote={(player) => { onVote(player) }}
                                            isSelected={selectedNumber != null && player.playerNumber === selectedNumber} 
                                        />
                                    ))
                                }

                            </div>
                    </>
                
                ) 
            }
            

            {/* Outlet for BrowserRouter and ToastContainer for success snack bar */}
            <ToastContainer/>
            <Outlet />
        </>
    )

}

VotingPage.propTypes = {
    socket: PropTypes.object,
    players: PropTypes.array,
    round: PropTypes.object
}

export default VotingPage