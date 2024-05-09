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
     * @param {*} sessionCode code of session to connect to
     * @param {*} onConnection callback function for when backend returns session data response
     * @param {*} previousUserID user id from session storage (if existing)
     * @param {*} previousSessionCode session code from session storage (if existing)
     */
    static async init(config, sessionCode, onConnection) {
        
        //check backend host config
        if (config.be_host) {

            //init, but dont connect yet
            this.socket = io(config.be_host, { autoConnect: false, reconnection: false })

            
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
            this.connectToSession(sessionCode)
        }
    }

    /**
     * disconnect to previous session and connect to new one
     * 
     * @param {*} sessionCode code of session to connect to
     */
    static connectToSession(sessionCode) {

        //check for userID and session code in session storage
        const previousUserID = sessionStorage.getItem('userID')
        const previousSessionCode = sessionStorage.getItem('sessionCode')

        //if found + session code is same as session to connect to: use userID to authenticate
        if ((previousUserID !== undefined || null) && (previousSessionCode !== undefined || null) && (previousSessionCode == sessionCode)) {
            this.socket.auth = { 'sessionCode': sessionCode, 'userID': previousUserID }

        //else make sure to disconnect from current session
        } else {
            this.disconnect()
            sessionStorage.removeItem('userID')
            this.socket.auth = { 'sessionCode': sessionCode }
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

        this.socket.on("session", ({ sessionCode, userID, players }) => {

            // attach the session code and userid to the next reconnection attempts
            this.socket.auth = { sessionCode: sessionCode, userID: userID };

            //store them as socket attributes as well
            this.socket.sessionCode = sessionCode
            this.socket.userID = userID;

            // save them in session storage for later reconnection attempts as well
            sessionStorage.setItem("userID", userID);
            sessionStorage.setItem("sessionCode", sessionCode);

            //save players
            this.socket.players = players

            //exec callback function
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