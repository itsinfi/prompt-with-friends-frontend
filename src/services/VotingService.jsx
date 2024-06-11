import SocketService from "./SocketService";


/**
 * Service to send prompts to backend and receive generated data
 */
class VotingService {


    /**
     * send a vote on a player's result
     * 
     * @param {*} voter playerNumber of player who votes
     * @param {*} voted playerNumber of result/player that has been voted for
     * @param {*} session Session code of the current session of the user
     * @param {*} callBack callback function to execute once vote has been sent out
     */
    static sendVote(voter, voted, session, callBack) {
        
        // Submit prompt to backend
        SocketService.emit("receiveVote", { voter: voter, voted: voted, session: session })
        
        // call callback function
        callBack()

    }

}

export default VotingService