import PropTypes from 'prop-types'
import { useState, useEffect, cloneElement } from 'react'
import SocketService from '../services/SocketService'
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner'


/**
 * Wrap this with every screen that uses a socket session connection
 * This wrapper initializes socket io and connects to specified session
 * 
 * @param child child page to be displayed 
 * @param config loaded config file to pass to socketservice
 * @returns Child wrapped with content
 */
function SocketSessionConnector({ child , config } ) {

    const [socket, setSocket] = useState(null)

    //session data
    const [session, setSession] = useState(null)

    //players in session
    const [players, setPlayers] = useState(null)
    
    //current player
    const [currentPlayer, setCurrentPlayer] = useState(null)

    //TODO: implement function to check if user is admin
    // const [isHost, setAdmin] = useState(true) //useState(/*players.find(player => player.id === userID).isHost*/)

    const [error, setError] = useState(null)


    //init socket.io and check vor joining/leaving players
    useEffect(() => {

        //TODO: change how values are inserted

        SocketService.init(config, 1, () => {
            const _socket = SocketService.socket

            //init props
            setSocket(undefined)
            setPlayers(_socket.players)

            //TODO: update session with session object from backend
            setSession({ id: _socket.sessionID, code: _socket.sessionID })

            //TODO: get current player from players (if not possible do error handling)
            setCurrentPlayer({ id: _socket.userID, isHost: _socket.userID === '1' })
        })

        SocketService.on('updatePlayers', (data) => {
            setPlayers(data.players)
            //TODO: update current player based on this function
        });

        SocketService.on('updateSession', (data) => {
            setSession(data.session)
        });

        SocketService.on('error', (err) => {
            console.error(err.message)
            SocketService.disconnect()
            sessionStorage.removeItem('userID')
            sessionStorage.removeItem('sessionID')
            setError(new Error(err.message))
        })

        return () => {
            SocketService.disconnect()
        }
        
    }, [config])


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

SocketSessionConnector.propTypes = {
    child: PropTypes.node.isRequired,
    config: PropTypes.object
}


export default SocketSessionConnector