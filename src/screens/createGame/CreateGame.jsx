import './CreateGame.css'
import { Outlet } from 'react-router-dom'
import Card from '../../components/card/Card'
import PlayerAvatar from '../../components/playerAvatar/PlayerAvatar'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { SuccessSnackBar } from '../../components/snackBar/SnackBar'
import PropTypes from 'prop-types'



/**
 * Create Game Page where user can invite other players and start the game
 * 
 * @returns
 */
function CreateGamePage(config) {

    console.log(config)

    let session = {id: 1, code: '1bc823'}

    //TODO: wait for backend implementation of session + create models to dynamically load and update here
    let players = [{id: 1, name: 'Player1'}, {id: 2, name: 'Player2'}, {id: 3, name: 'Player3'}, {id: 4, name: 'Player4'}, {id: 5, name: 'Player5'}, {id: 6, name: 'Player6'}]

    //TODO: implement function to check if user is admin
    const [isAdmin] = useState(true)

    //check whether conditions to start the game are met
    const [startGame, setStartGame] = useState(players.length > 1)
    useEffect(() => {
        setStartGame(players.length > 1)
    }, [players.length])

    //copy invite link to clipboard
    const copyInviteLink = () => {
        let input = document.getElementById('invite-link-input')
        if (input) {
            navigator.clipboard.writeText(input.value)
            copySuccessSnackBar()
        }
    }

    //Success Snack Bar
    const copySuccessSnackBar = SuccessSnackBar('Link kopiert!')


    return (
        <>
            {/* Player Avatars */}
            <Card>
                <div className='flex-row'>
                    {
                        players.map(player => (
                            <PlayerAvatar key={player.id} player={player}/>
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
            {isAdmin && startGame && (<Card>
                            <button>
                                Start game
                            </button>
                        </Card>)}
            
            {/* Outlet for BrowserRouter and ToastContainer for success snack bar */}
            <ToastContainer/>
            <Outlet />
        </>
    )
}

CreateGamePage.propTypes = {
    config: PropTypes.object.isRequired
}

export default CreateGamePage