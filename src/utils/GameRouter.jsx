import PropTypes from 'prop-types'
import { useState, useEffect  } from 'react'
import CreateGamePage from '../screens/game/createGame/CreateGame'
import InputPromptPage from '../screens/game/inputPrompt/InputPrompt'
import VotingPage from '../screens/game/voting/Voting'
import LeaderboardPage from '../screens/game/leaderboard/Leaderboard'
import SocketService from '../services/SocketService'


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
    const [gameState, setGameState] = useState({activeRound: null, roundPhase: 0, rounds: []})

    // update game state on session update
    // useEffect(() => {
    //     setGameState(session.gamestate)
    // }, [session])



    //timer
    const [timer, setTimer] = useState(0)
    SocketService.on('timer', ({ time }) => {
        setTimer(time)
    });
    
    
    // Round Model
    const [round, setRound] = useState({ task: 'Erstelle einen Brief für deinen Vorgesetzen, welcher 300 Wörter lang ist.', tip: 'Meinst du, dass sie die Gedanken genommen haben, die wir gedacht haben, und wollen, dass wir denken, dass die Gedanken, die wir gedacht haben, die Gedanken sind, die wir jetzt denken? Denkst du das?' })

    // Results
    const [results, setResults] = useState([{playerNumber: 4, prompt: "prompt", result: "result"}, {playerNumber: 2, prompt: "prompt", result: "result"}])

    // update round and results on session update
    useEffect(() => {

        // check if no round is initialized yet
        if (!session.gamestate.activeRound || session.gamestate.rounds.isEmpty) {
            return
        }

        // read round
        const _round = session.gamestate.rounds[session.gamestate.activeRound]

        // set round to activeRound
        // setRound(session.gamestate.rounds[session.gamestate.activeRound]) //TODO:
        // setResults(_round.results)

    }, [session])
    

    switch (gameState.roundPhase) {
        case -1:
            return <CreateGamePage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players} />
        case 0:
            return <InputPromptPage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players} round={round} timer={timer} results={results} />
        case 1:
            return <VotingPage config={config} socket={socket} session={session} currentPlayer={currentPlayer} players={players} round={round} timer={timer} results={results} />
        case 2:
            return <LeaderboardPage socket={socket} currentPlayer={currentPlayer} players={players} round={round} timer={timer} results={results} />
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