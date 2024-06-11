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

        //check for playerNumber and session code in session storage
        const previousPlayerNumber = sessionStorage.getItem('playerNumber')
        const previousSessionCode = sessionStorage.getItem('sessionCode')

        //if found + session code is same as session to connect to: use playerNumber to authenticate
        if ((previousPlayerNumber !== undefined || null) && (previousSessionCode !== undefined || null) && (previousSessionCode == sessionCode)) {
            this.socket.auth = { 'sessionCode': sessionCode, 'playerNumber': previousPlayerNumber }

        //else make sure to disconnect from current session
        } else {
            this.disconnect()
            this.socket.auth = { 'sessionCode': sessionCode }
            sessionStorage.removeItem('playerNumber')
            sessionStorage.setItem('sessionCode', sessionCode)
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

        this.socket.on("connectionFeedback", ({ session, player, players }) => {

            // attach the session code and playerNumber to the next reconnection attempts
            this.socket.auth = { sessionCode: session.sessionCode, playerNumber: player.playerNumber };

            //store them as socket attributes as well
            this.socket.session = session
            this.socket.player = player;
            this.socket.players = players;

            // save them in session storage for later reconnection attempts as well
            sessionStorage.setItem("playerNumber", player.playerNumber);
            sessionStorage.setItem("sessionCode", session.sessionCode);

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
     * subscribe to event, but only for one callback
     * 
     * @param {*} eventName name of event 
     * @param {*} onEvent callback function to execute
     */
    static once(eventName, onEvent) {
        this.socket.once(eventName, onEvent)
    }

    /**
     * emit an event
     * 
     * @param {*} eventName name of event
     * @param {*} message message to emit
     */
    static emit(eventName, message) {
        this.socket.emit(eventName, message)
    }

    /**
     * handle disconnection of socket
     */
    static disconnect() {
        this.socket.disconnect()
    }

}

export default SocketService