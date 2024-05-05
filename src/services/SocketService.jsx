import { io } from "socket.io-client"

class SocketService {
    static socket

    static init(config) {
        if (config.be_host) {
            this.socket = io(config.be_host, { autoConnect: false })

            this.socket.onAny((event, ...args) => {
                console.log(event, args);
            });

            this.socket.on("session", ({ sessionID, userID }) => {

                // attach the session ID to the next reconnection attempts
                this.socket.auth = { sessionID };
                // // store it in the localStorage
                // localStorage.setItem("sessionID", sessionID);
                // // save the ID of the user
                // this.socket.userID = userID;
                // localStorage.setItem("userID", userID);
            });
        }
    }

    static createSession() {
        //let session = SessionService.createSession()
    }

    static connectToSession(sessionID) {
        this.socket.disconnect()
        this.socket.auth = { sessionID: sessionID }
        this.socket.connect()
    }

}

export default SocketService