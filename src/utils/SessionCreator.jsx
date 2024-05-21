import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner'
import { Navigate } from 'react-router-dom'
import SessionService from '../services/SessionService'


/**
 * This Component communicates with the session api and creates a new session
 * 
 * @param config loaded config file to pass to session service
 * @returns redirect to session
 */
function SessionCreator({ config }) {

    const [session, setSession] = useState(null)

    const [error, setError] = useState(null)

    const inProgress = useRef(false)


    //init socket.io and check vor joining/leaving players
    useEffect(() => {

        if (inProgress.current) {
            return
        }

        //send post request to create new session and return json response
        async function getNewSession() {
            return (await SessionService.createSession(config)).json().then(json => { return json})
        }

        inProgress.current = true;
        
        //create sesssion and then set session storage values and set the session parameter for the new route to load
        getNewSession().then(session => {
            sessionStorage.setItem('playerNumber', session.players[0].playerNumber)
            sessionStorage.setItem('sessionCode', session.sessionCode)
            setSession(session.sessionCode)
            inProgress.current = false;
        }).catch(err => {
            console.error(err)
            setError(new Error('Session konnte nicht erstellt werden'))
            inProgress.current = false;
        })

        
    }, [config, inProgress])


    //check if there is an error
    if (error) {
        throw error
    }


    //wait for response from session api
    if (!session) {
        return <LoadingSpinner />
    }

    //redirect to connect to newly created session
    return <Navigate to={`/${session}`} />
    
}

SessionCreator.propTypes = {
    config: PropTypes.object
}


export default SessionCreator