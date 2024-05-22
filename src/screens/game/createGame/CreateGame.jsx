import './CreateGame.css'
import { Outlet } from 'react-router-dom'
import Card from '../../../components/card/Card'
import PlayerAvatar from '../../../components/playerAvatar/PlayerAvatar'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { SuccessSnackBar } from '../../../components/snackBar/SnackBar'
import PropTypes from 'prop-types'
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner'



/**
 * Create Game Page where user can invite other players and start the game
 * 
 * @param config Config of the frontend
 * @param socket Socket client object
 * @param session Session client connected to
 * @param currentPlayer Model of current player
 * @param players Array of all players in the session
 * @returns 
 */
function CreateGamePage({ config, socket, session, currentPlayer, players }) {

    


    //check whether conditions to start the game are met
    const [startGame, setStartGame] = useState(null)
    useEffect(() => {
        setStartGame(players.length > 1)
    }, [socket, players])


    //copy invite link to clipboard
    const copyInviteLink = () => {
        let input = document.getElementById('invite-link-input')
        if (input) {
            navigator.clipboard.writeText(input.value)
            copySuccessSnackBar()
        }
    }

    //Success Snack Bar for copying to clipboard
    const copySuccessSnackBar = SuccessSnackBar('Link kopiert!')


    return (
        <>
            {   //check if socket connection has been established + players are loaded
                !socket || !players ? <LoadingSpinner />
                
                    : (
            
                    <>
                        {/* Player Avatars */}
                        <Card>
                            <div className='flex-row'>
                                {   
                                    players.map(player => (
                                        <PlayerAvatar key={player.playerNumber} player={player} currentPlayerNumber={currentPlayer.playerNumber}/>
                                    ))
                                }
                            </div>
                        </Card>
                        
                        {/* Invite Link Card */}
                        <Card>
                            <h2>
                                Lade deine Freunde ein!
                            </h2>
                            <div className='invite-link-input'>
                                <input id='invite-link-input' type='text' placeholder='loading...' value={`play.${config.name}.com/${session.sessionCode}`} readOnly onClick={(event) => event.target.select()}/>
                            </div>
                            <div className='invite-link-button'>
                                <button onClick={copyInviteLink}>
                                    Kopieren
                                </button>
                            </div>
                        </Card>
                        
                        {/* Start game card */}
                            {currentPlayer.isHost && startGame
                                && (<Card>
                                        <button className='start-game'>
                                            Start game
                                        </button>
                                    </Card>)}
                    </>
                
                ) 
            }
            

            {/* Outlet for BrowserRouter and ToastContainer for success snack bar */}
            <ToastContainer/>
            <Outlet />
        </>
    )

}

CreateGamePage.propTypes = {
    config: PropTypes.object,
    socket: PropTypes.object,
    session: PropTypes.object,
    currentPlayer: PropTypes.object,
    players: PropTypes.array
}

export default CreateGamePage