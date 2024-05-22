import ErrorMessage from "../../components/errorMessage/ErrorMessage"
import ParticlesWrapper from "../../components/particles/ParticlesWrapper"
import ConfigLoader from "../../utils/ConfigLoader"
import SessionConnector from "../../utils/SessionConnector"
import GameRouter from "../../utils/GameRouter"

/**
 * TODO: add dynamic page loading based on game state
 * 
 * This component is reponsible for loading the game browser route by providing all the necessary loading of data or additional components beforehand. This includes:
 * - ErrorMessage: Error Boundary to display errors and do error handling
 * - ParticlesWrapper: Particles from particles.js by Vincent Garreau
 * - ConfigLoader: Loader for the config file to init all necessary values
 * - SessionConnector: connects to a session and loads all necessary data for sub pages accordingly
 * 
 * @returns GamePage
 */
const GamePage = () => {

    return  <ErrorMessage>
                <ParticlesWrapper child={
                    <ConfigLoader child={
                        <SessionConnector child={
                            <GameRouter/>}
                        />}
                    />
                }/>
            </ErrorMessage>

}

export default GamePage