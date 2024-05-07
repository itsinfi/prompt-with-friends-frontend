import PropTypes from 'prop-types'
import { useState, useEffect, cloneElement, useRef } from 'react'
import SocketService from '../../services/SocketService'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'


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
    // const [isAdmin, setAdmin] = useState(true) //useState(/*players.find(player => player.id === userID).isAdmin*/)

    const [error, setError] = useState(null)

    
    //init socket.io and check vor joining/leaving players
    useEffect(() => {

        SocketService.init(config, 2, () => {
            const _socket = SocketService.socket
            setSocket(undefined)
            setPlayers(_socket.players)
            setSession({ id: _socket.sessionID, code: _socket.sessionID })
            setCurrentPlayer({ id: _socket.userID, isAdmin: true })
        })

        SocketService.on('updatePlayers', (data) => {
            setPlayers(data.players)
        });

        SocketService.on('error', (err) => {
            console.error(err.message)
            SocketService.disconnect()
            setError(new Error(err.message))
        })

        return () => {
            SocketService.disconnect()
        }
        
    }, [config])



    //TODO: implement new use effect (best to also use socket io)
    // useEffect(() => {
    //     setAdmin(currentPlayer.isAdmin)
    // }, [currentPlayer.isAdmin])


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