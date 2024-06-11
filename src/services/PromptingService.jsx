import SocketService from "./SocketService";


/**
 * Service to send prompts to backend and receive generated data
 */
class PromptingService {

    // true if a generation is already active
    static inProcess = false




    /**
     * send a prompt to receive a result
     * 
     * @param {*} prompt prompt input
     * @param {*} callBack callback function to execute once result has been received
     */
    static sendTextPrompt(prompt, callBack) {

        // Check if input is empty
        if (!prompt || prompt.isEmpty) {
            throw new Error('Bitte das Feld ausfüllen.')
        }

        // Check if generation is already in process
        if (this.inProcess) {
            throw new Error('Bitte warten, die Anfrage wird noch verarbeitet.')
        }

        // Set inProcess to true
        this.inProcess = true
        
        // Submit prompt to backend
        SocketService.emit("sendPrompt", {prompt: prompt})

        // Add an event listener to call once the result has been received
        SocketService.once("sendPrompt", ({timestamp, result}) => {
            
            // set inProcess to false
            this.inProcess = false
            
            // Execute call back function and set the received data as arguments
            callBack(timestamp, result)
        })

    }

}

export default PromptingService