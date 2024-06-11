import PropTypes from 'prop-types'
import { useState, useEffect  } from 'react'
import CreateGamePage from '../screens/game/createGame/CreateGame'
import InputPromptPage from '../screens/game/inputPrompt/InputPrompt'
import VotingPage from '../screens/game/voting/Voting'
import LeaderboardPage from '../screens/game/leaderboard/Leaderboard'
import getRandomTip from './getRandomTip'


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
    const [gameState, setGameState] = useState(session.gamestate)
    
    // Task
    const [task, setTask] = useState(session.gamestate.rounds === undefined || session.gamestate.rounds.length === 0 ? {description: '', tips: []} : session.gamestate.rounds[session.gamestate.activeRound].task)

    // Results
    const [results, setResults] = useState([])

    // Votes
    const [votes, setVotes] = useState([])

    // update Game State, task, results and votes on session update
    useEffect(() => {

        console.log(session)

        // update game state
        setGameState(session.gamestate)

        // check if no round is initialized yet
        if (session.gamestate.activeRound === null || session.gamestate.rounds.isEmpty) {
            return
        }

        // read round
        const _round = session.gamestate.rounds[session.gamestate.activeRound]

        // set round to activeRound
        if (_round !== undefined) {
            setTask(_round.task)
            setResults(_round.results)
            setVotes(_round.votes)
        }

    }, [session])
    


    // load correct child based on round phase
    switch (gameState.roundPhase) {

        // Create Game Page
        case null:
        case -1:
            return <CreateGamePage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players} />
        
        // Input Prompt Page
        case 0:
            return <InputPromptPage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players} taskDescription={task.description} taskTip={getRandomTip(task.tips)} results={results} />
        
        // Voting Page
        case 1:
            return <VotingPage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players} taskDescription={task.description} results={results} votes={votes} />
        
        // Leaderboard Page
        case 2:
            return <LeaderboardPage socket={socket} currentPlayer={currentPlayer} players={players} taskDescription={task.description} results={results} votes={votes} />
        
        // Error for invalid values
        default:
            throw new Error('Die Spielphase konnte nicht richtig ausgelesen werden.')
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