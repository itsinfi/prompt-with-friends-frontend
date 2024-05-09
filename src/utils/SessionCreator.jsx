import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
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


    //init socket.io and check vor joining/leaving players
    useEffect(() => {

        async function getNewSession() {
            const sessionCode = await SessionService.createSession()
            return sessionCode
        }
        
        getNewSession().then(sessionCode => {
            setSession(sessionCode)
        }).catch(err => {
            setError(new Error(err.message))
        })

        
    }, [config])


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