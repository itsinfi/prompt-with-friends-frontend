import './Leaderboard.css'
import { Outlet } from 'react-router-dom'
import Card from '../../../components/card/Card'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner'
import TaskDescription from '../../../components/task/TaskDescription'
import Timer from '../../../components/timer/Timer'
import RoundResult from '../../../components/roundResult/RoundResult'
import SocketService from '../../../services/SocketService'
import { useEffect, useRef, useState } from 'react'
import getPositionMap from '../../../utils/getPositionMap'



/**
 * The page where the actual game in form of communication with the api takes place.
 * 
 * @param config Config of the frontend
 * @param socket Socket client object
 * @param session Session client connected to
 * @param currentPlayer Model of current player
 * @param players Array of all players in the session
 * @param taskDescription description of task
 * @param results array of results returned when sending prompts
 * @param votes array of votes on players' results
 * @returns 
 */
function LeaderboardPage({ socket, currentPlayer, players, taskDescription, results, votes }) {

    // timer
    const [timer, setTimer] = useState(0)
    useEffect(() => {
        SocketService.on('timer', ({ time }) => {
            setTimer(time)
        });
    }, [])


    // sorted map of players by position
    const positionMap = useRef(getPositionMap(players))


    return (
        <>
            {   //check if socket connection has been established + players are loaded
                !socket && !players ? <LoadingSpinner />
                
                    : (
            
                    <>
                        
                        <Card >
                                
                            {/*Game progress*/}
                            <div className='flex-row jc-around'>
                                <h1>Ergebnisse</h1>
                                    
                                <Timer seconds={timer} label='bis zur nächsten Runde'/>   
                            </div>

                            {/*Task description*/}
                            <TaskDescription description={taskDescription} />
                                

                        </Card>
                            {/*Results with score*/}
                                    
                                {
                                    players
                                    .sort((player1, player2) => player2.score - player1.score)
                                    .map(player => (
                                        <RoundResult
                                            key={ player.playerNumber }
                                            player={ player }
                                            result={ results.find(result => result.playerNumber === player.playerNumber) }
                                            disableMargin={ false }
                                            isSelected={ false } 
                                            showScore={ true }
                                            currentPlayerNumber={currentPlayer.playerNumber}
                                            votesOnPlayer={votes.filter(vote => vote.voted === player.playerNumber)}
                                            position={positionMap.current.get(player.playerNumber)}
                                        />
                                    ))
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

LeaderboardPage.propTypes = {
    socket: PropTypes.object,
    currentPlayer: PropTypes.object,
    players: PropTypes.array,
    taskDescription: PropTypes.string,
    results: PropTypes.array,
    votes: PropTypes.array
}

export default LeaderboardPage