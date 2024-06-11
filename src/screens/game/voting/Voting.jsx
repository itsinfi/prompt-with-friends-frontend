import './Voting.css'
import { Outlet } from 'react-router-dom'
import Card from '../../../components/card/Card'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner'
import TaskDescription from '../../../components/task/TaskDescription'
import Timer from '../../../components/timer/Timer'
import RoundResult from '../../../components/roundResult/RoundResult'
import SocketService from '../../../services/SocketService'



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
function VotingPage({ socket, currentPlayer, players, task, results }) {

    //timer
    const [timer, setTimer] = useState(0)
    useEffect(() => {
        SocketService.on('timer', ({ time }) => {
            setTimer(time)
        });
    }, [])


    // playerNumber that is selected for vote TODO: remove
    const [selectedNumber, setSelectedNumber] = useState(null)


    // change vote
    const onVote = (result) => {
        setSelectedNumber(result.playerNumber)
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
                                    
                                <Timer seconds={timer} label='bis zu den Ergebnissen'/>   
                            </div>

                            {/*Task description*/}
                            <TaskDescription description={task.description} />
                                

                        </Card>
                            
                            {/*Results*/}

                            {
                                results.length === 0
                            
                                    
                                // empty placeholder for no results
                                ?   <Card>
                                        <h1>Keine Ergebnisse</h1>
                                    </Card>
                                    

                                // show all results
                                :   <div className='grid-container'>
                                    
                                        {

                                            results
                                                .filter(
                                                    result => result.playerNumber !== currentPlayer.playerNumber
                                                )//TODO: fix
                                                .map(result => (
                                                    <RoundResult
                                                        key={result.playerNumber}
                                                        player={result}
                                                        result={result}
                                                        onVote={(result) => { onVote(result) }}
                                                        isSelected={selectedNumber != null && result.playerNumber === selectedNumber} 
                                                    />
                                                ))
                                        }
        
                                    </div>
                            }

                            
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
    currentPlayer: PropTypes.object,
    players: PropTypes.array,
    task: PropTypes.object,
    timer: PropTypes.number,
    results: PropTypes.array
}

export default VotingPage