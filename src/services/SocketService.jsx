import { io } from "socket.io-client"

/**
 * Service to handle all communication via Websockets
 */
class SocketService {

    /**
     * current info about the client socket
     */
    static socket

    /**
     * init socket connection to backend
     * 
     * @param {*} config configuration object
     * @param {*} sessionID id of session to connect to
     * @param {*} onConnection callback function for when backend returns session data response
     * @param {*} previousUserID user id from session storage (if existing)
     * @param {*} previousSessionID session id from session storage (if existing)
     */
    static init(config, sessionID, onConnection) {
        
        //check backend host config
        if (config.be_host) {

            //init, but dont connect yet
            this.socket = io(config.be_host, { autoConnect: false })

            
            //TODO: remove, only for dev purposes
            //prints out every response in console
            this.socket.onAny((event, ...args) => {
                console.log(event, args);
            });

            //define how to handle session data returned by backend (and then execute callback function)
            this.handleSessionData(onConnection)
            
            //define how to handle players joining/leaving session
            this.socket.on('updatePlayers', (players) => {
                this.socket.players = players 
            })

            //connect to session
            this.connectToSession(sessionID)
        }
    }

    /**
     * disconnect to previous session and connect to new one
     * 
     * @param {*} sessionID id of session to connect to (TODO: change to code instead?!)
     */
    static connectToSession(sessionID) {

        //check for userID in sessionStorage
        const previousUserID = sessionStorage.getItem('userID')

        //if found use userID to authenticate
        if (previousUserID !== undefined || null) {
            this.socket.auth = { 'sessionID': sessionID, 'userID': previousUserID }

        //else make sure to disconnect from current session
        } else {
            this.disconnect()
            sessionStorage.removeItem('userID')
            this.socket.auth = { 'sessionID': sessionID }
        }

        //connect to server side socket
        this.socket.connect()
    }
        
    /**
     * handle session data received from backend and execute callback function
     * 
     * @param {*} onConnection callback function to execute
     */
    static handleSessionData(onConnection) {
        this.socket.on("session", ({ sessionID, userID, players }) => {

            // attach the session ID to the next reconnection attempts
            this.socket.auth = { sessionID: sessionID, userID: userID };
            this.socket.sessionID = sessionID

            // save the ID of the user
            this.socket.userID = userID;
            sessionStorage.setItem("userID", userID);

            //save players
            this.socket.players = players

            onConnection()
        });
    }

    /**
     * subscribe to event
     * 
     * @param {*} eventName name of event 
     * @param {*} onEvent callback function to execute
     */
    static on(eventName, onEvent) {
        this.socket.on(eventName, onEvent)
    }

    /**
     * emit an event
     * 
     * @param {*} eventName name of event
     * @param {*} onEvent message to emit
     */
    static emit(eventName, onEvent) {
        this.socket.emit(eventName, onEvent)
    }

    /**
     * handle disconnection of socket
     */
    static disconnect() {
        this.socket.disconnect()
    }

}

export default SocketService