import PropTypes from 'prop-types'
import { useState, useEffect  } from 'react'
import CreateGamePage from '../screens/game/createGame/CreateGame'
import InputPromptPage from '../screens/game/inputPrompt/InputPrompt'
import VotingPage from '../screens/game/voting/Voting'
import LeaderboardPage from '../screens/game/leaderboard/Leaderboard'


/**
 * Dynamic router for game, to load the correct screen according to the current game state of the session
 * 
 * @param child child page to be displayed 
 * @param config loaded config file to pass to socketservice
 * @returns Child wrapped with content
 */
function GameRouter({ config, socket, session, currentPlayer, players }) {

    const [gameState, setGameState] = useState(0)

    // TODO: update game state dynamically
    // useEffect(() => {
    //     setGameState()
    // }, [])

    switch (gameState) {
        case 0:
            return <CreateGamePage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players}/>
        case 1:
            return <InputPromptPage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players}/>
        case 2:
            return <VotingPage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players}/>
        case 3:
            return <LeaderboardPage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players}/>
        default:
            throw new Error('Die Session konnte nicht richtig ausgelesen werden.')
    }
    
}

GameRouter.propTypes = {
    config: PropTypes.object,
    socket: PropTypes.object,
    session: PropTypes.object,
    currentPlayer: PropTypes.object,
    players: PropTypes.array
}


export default GameRouter