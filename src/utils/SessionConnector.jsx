import PropTypes from 'prop-types'
import { useState, useEffect, cloneElement, useRef } from 'react'
import SocketService from '../services/SocketService'
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner'
import { useLoaderData } from 'react-router-dom'


/**
 * Wrap this with every screen that uses a socket session connection
 * This wrapper initializes socket io and connects to specified session
 * 
 * @param child child page to be displayed 
 * @param config loaded config file to pass to socketservice
 * @returns Child wrapped with content
 */
function SessionConnector({ child, config }) {

    
    //  load session code
    const sessionCode = useLoaderData()

    // client socket
    const [socket, setSocket] = useState(null)

    //session data
    const [session, setSession] = useState(null)

    //players in session
    const [players, setPlayers] = useState(null)
    
    //current player
    const [currentPlayer, setCurrentPlayer] = useState(null)

    //error handling
    const [error, setError] = useState(null)

    //timeout checking
    const timeoutIsSet = useRef(false)
    const timeout = useRef(null)


    //init socket.io and check vor joining/leaving players
    useEffect(() => {

        // Set up a timeout to throw an error after 5 seconds
        if (!timeoutIsSet.current) {
            timeout.current = setTimeout(() => {
                setError(new Error("Es konnte keine Verbindung zum Server aufgebaut werden."))
            }, 5000)
            timeoutIsSet.current = true
        }

        // change how values are inserted
        SocketService.init(config, sessionCode, () => {

            // read socket
            const _socket = SocketService.socket


            // init props
            setSocket(_socket)

            // update session with session object from backend
            setSession(_socket.session)

            // get current player from players (if not possible do error handling)
            setCurrentPlayer(_socket.player)

            // get players in session
            setPlayers(_socket.players)

            //stop timeout timer
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        })

        //handle updates in the session
        SocketService.on('updateSession', (data) => {
            setSession(data.session)
        });

        //handle server side errors
        SocketService.on('error', (err) => {
            console.error(err.message)
            SocketService.disconnect()
            sessionStorage.removeItem('playerNumber')
            sessionStorage.removeItem('sessionCode')
            setError(new Error(err.message))
        })

        //disconnect if destroyed
        return () => {
            SocketService.disconnect()
        }
        
    }, [config, sessionCode])


    useEffect(() => {
        //handle updates for the players
        SocketService.on('updatePlayers', ({ players }) => {

            if (!currentPlayer) {
                return
            }


            setPlayers(players)
            
            const _currentPlayer = players.find(p => p.playerNumber.toString() === currentPlayer.playerNumber.toString())
            
            if (_currentPlayer && _currentPlayer !== undefined) {
                setCurrentPlayer(_currentPlayer)
            }
        });
    }, [currentPlayer])

    

    //check if there is an error
    if (error) {
        throw error
    }


    //check if socket connection has been established + players are loaded
    if (!socket || !players) {
        return <LoadingSpinner />
    }

    //return child with elements but override additional properties
    return cloneElement(child, { config: config, socket: socket, session: session, currentPlayer: currentPlayer, players: players })
    
}

SessionConnector.propTypes = {
    child: PropTypes.node.isRequired,
    config: PropTypes.object
}


export default SessionConnector