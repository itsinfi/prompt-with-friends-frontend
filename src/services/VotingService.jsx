import SocketService from "./SocketService";


/**
 * Service to send prompts to backend and receive generated data
 */
class VotingService {


    /**
     * send a vote on a player's result
     * 
     * @param {*} voted playerNumber of result/player that has been voted for
     * @param {*} callBack callback function to execute once vote has been sent out
     */
    static sendVote(voted, callBack) {
        
        // Submit prompt to backend
        SocketService.emit("receiveVote", {voted: voted})
        
        // call callback function
        callBack()

    }

}

export default VotingService