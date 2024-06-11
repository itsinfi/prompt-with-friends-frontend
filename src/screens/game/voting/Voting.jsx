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
import VotingService from '../../../services/VotingService'
import { SuccessSnackBar } from '../../../components/snackBar/SnackBar'



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
function VotingPage({ socket, session, currentPlayer, players, task, results, votes }) {

    //timer
    const [timer, setTimer] = useState(0)
    useEffect(() => {
        SocketService.on('timer', ({ time }) => {
            setTimer(time)
        });
    }, [])


    // playerNumber that is selected for vote TODO: remove
    const [vote, setVote] = useState(votes.find(vote => vote.voter === currentPlayer.playerNumber))


    // change vote
    const onVote = (result) => {
        setVote({voted: result.playerNumber})
        VotingService.sendVote(currentPlayer.playerNumber, result.playerNumber, session.sessionCode, () => {
            votingSuccessSnackBar()
        })
    }


    //Snack Bar for voting feedback
    const votingSuccessSnackBar = SuccessSnackBar('Erfolgreich für das Ergebnis gevoted!')



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
                                                    )
                                                    .map(result => (
                                                        <RoundResult
                                                            key={result.playerNumber}
                                                            result={result}
                                                            onVote={(result) => { onVote(result) }}
                                                            isSelected={vote != null && vote.voted !== undefined && result.playerNumber === vote.voted} 
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
    session: PropTypes.object,
    currentPlayer: PropTypes.object,
    players: PropTypes.array,
    task: PropTypes.object,
    timer: PropTypes.number,
    results: PropTypes.array,
    votes: PropTypes.array
}

export default VotingPage