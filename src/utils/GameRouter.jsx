import PropTypes from 'prop-types'
import { useState, useEffect  } from 'react'
import CreateGamePage from '../screens/game/createGame/CreateGame'
import InputPromptPage from '../screens/game/inputPrompt/InputPrompt'
import VotingPage from '../screens/game/voting/Voting'
import LeaderboardPage from '../screens/game/leaderboard/Leaderboard'


/**
 * Dynamic router for game, to load the correct screen according to the current game state of the session
 * 
 * @param config Config of the frontend
 * @param socket Socket client object
 * @param session Session client connected to
 * @param currentPlayer Model of current player
 * @param players Array of all players in the session
 * @returns Child wrapped with content
 */
function GameRouter({ config, socket, session, currentPlayer, players }) {

    // current game state
    // change this value if you want to see a different page
    const [gameState, setGameState] = useState(-1)

    // Round Model
    const round = { time: '30', task: 'Erstelle einen Brief für deinen Vorgesetzen, welcher 300 Wörter lang ist.' }

    // TODO: update game state dynamically
    // useEffect(() => {
    //     setGameState()
    // }, [])

    switch (gameState) {
        case -1:
            return <CreateGamePage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players}/>
        case 0:
            return <InputPromptPage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players} round={round}/>
        case 1:
            return <VotingPage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players} round={round}/>
        case 2:
            return <LeaderboardPage socket={socket} currentPlayer={currentPlayer} players={players} round={round}/>
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