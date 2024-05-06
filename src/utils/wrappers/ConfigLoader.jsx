import PropTypes from 'prop-types'
import { useState, useEffect, cloneElement } from 'react'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'
import Card from '../../components/card/Card'


/**
 * Wrap this with every screen/or wrapper that uses data from the config
 * This wrapper reads config file and parses it to its child
 * 
 * @param child child page to be displayed
 */
function ConfigLoader({ child }) {

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

    return (
        <>
            {   //check if config has been loaded
                !config ? (
            
                    <Card>
                        <LoadingSpinner />
                    </Card>

                ) : (
                        //load element and add config to properties
                        cloneElement(child, {config: config})
                )
            }
        </>
    )

}

ConfigLoader.propTypes = {
    child: PropTypes.node.isRequired,
}

export default ConfigLoader