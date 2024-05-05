import './CreateGame.css'
import { Outlet } from 'react-router-dom'
import Card from '../../components/card/Card'
import PlayerAvatar from '../../components/playerAvatar/PlayerAvatar'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { SuccessSnackBar } from '../../components/snackBar/SnackBar'
import PropTypes from 'prop-types'
import SocketService from '../../services/SocketService'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'



/**
 * Create Game Page where user can invite other players and start the game
 * 
 * @returns
 */
function CreateGamePage(config) {

    const [socket, setSocket] = useState(null)

    //session data
    const [session, setSession] = useState(null)

    //players in session
    const [players, setPlayers] = useState(null)
    
    //current user id
    const [userID, setUser] = useState(null)

    //TODO: implement function to check if user is admin
    const [isAdmin, setAdmin] = useState(true) //useState(/*players.find(player => player.id === userID).isAdmin*/)

    
    //init socket.io and check vor joining/leaving players
    useEffect(() => {

        SocketService.init(config, 1, () => {
            const _socket = SocketService.socket
            setSocket(_socket)
            setPlayers(_socket.players)
            setSession({ id: _socket.sessionID, code: _socket.sessionID })
            setUser(_socket.userID)
        })

        SocketService.on('updatePlayers', (data) => {
            console.log(data.players)
            setPlayers(data.players)
        })

        return () => {
            SocketService.disconnect()
        }
        
    }, [config])


    //TODO: implement new use effect (best to also use socket io)
    // useEffect(() => {
    //     setAdmin(currentPlayer.isAdmin)
    // }, [currentPlayer.isAdmin])


    //check whether conditions to start the game are met
    const [startGame, setStartGame] = useState(null)
    useEffect(() => {
        if (socket && players) {
            setStartGame(players.length > 1)
        }
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

    if (socket) {
        console.log(`PLAYERS: ${players}`)
    }
    


    return (
        <>
            {   //check if socket connection has been established + players are loaded
                !socket && !players ? (
            
                <Card>
                    <LoadingSpinner/>
                </Card>

            ) : (
            
                    <>
                        {/* Player Avatars */}
                        <Card>
                            <div className='flex-row'>
                                {//TODO: use player model && override isADmin
                                    players.map(player => (
                                        <PlayerAvatar key={player} player={{ id: player, isAdmin: userID === player }}/>
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
                                <input id='invite-link-input' type='text' placeholder='loading...' value={`play.${config.config.name}.com/${session.code}`} readOnly onClick={(event) => event.target.select()}/>
                            </div>
                            <div className='invite-link-button'>
                                <button onClick={copyInviteLink}>
                                    Kopieren
                                </button>
                            </div>
                        </Card>
                        
                        {/* Start game card */}
                            {isAdmin && startGame
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
    config: PropTypes.object.isRequired,
}

export default CreateGamePage