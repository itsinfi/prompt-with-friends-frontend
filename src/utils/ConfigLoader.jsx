import PropTypes from 'prop-types'
import { useState, useEffect, cloneElement } from 'react'
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner'


/**
 * Wrap this with every screen/or wrapper that uses data from the config
 * This wrapper reads config file and parses it to its child
 * 
 * @param child child page to be displayed
 */
function ConfigLoader({ child }) {

    console.log('update state of config loader')

    //config
    const [config, setConfig] = useState(null)

    useEffect( () => {

        //load config
        async function loadConfig() {
            const response = await fetch('config.json')
            const configData = await response.json()
            return configData
        }

        //after loading config, update config usestate
        loadConfig().then(_config => {
            setConfig(_config)
        }).catch(err => {
            console.error(err)
        })

    }, [])



    //check if config has been loaded
    if (!config) {
        return <LoadingSpinner />
    }


    //load element and add config to properties
    return cloneElement(child, {config: config})

}

ConfigLoader.propTypes = {
    child: PropTypes.node.isRequired,
}

export default ConfigLoader