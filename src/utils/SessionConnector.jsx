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

    console.log('update state of session connector')
    
    const sessionCode = useLoaderData()

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

        //TODO: change how values are inserted
        SocketService.init(config, sessionCode, () => {

            //read socket
            const _socket = SocketService.socket

            //init props
            setSocket(_socket)
            setPlayers(_socket.players)

            //TODO: update session with session object from backend
            setSession({ code: _socket.sessionCode })

            //TODO: get current player from players (if not possible do error handling)
            setCurrentPlayer({ id: _socket.userID, isHost: _socket.userID === '1' })

            //stop timeout timer
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        })

        //handle updates for the players
        SocketService.on('updatePlayers', (data) => {
            setPlayers(data.players)
            //TODO: update current player based on this function
        });

        //handle updates in the session
        SocketService.on('updateSession', (data) => {
            setSession(data.session)
        });

        //handle server side errors
        SocketService.on('error', (err) => {
            console.error(err.message)
            SocketService.disconnect()
            sessionStorage.removeItem('userID')
            sessionStorage.removeItem('sessionCode')
            setError(new Error(err.message))
        })

        //disconnect if destroyed
        return () => {
            SocketService.disconnect()
        }
        
    }, [config, sessionCode])

    


    //check if there is an error
    if (error) {
        throw error
    }


    //check if socket connection has been established + players are loaded
    if (!socket && !players) {
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