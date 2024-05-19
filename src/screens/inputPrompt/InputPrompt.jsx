import './InputPrompt.css'
import { Outlet } from 'react-router-dom'
import Card from '../../components/card/Card'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { ErrorSnackBar, InfoSnackBar, SuccessSnackBar } from '../../components/snackBar/SnackBar'
import PropTypes from 'prop-types'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'
import PromptTextArea from '../../components/promptTextArea/PromptTextArea'
import TaskDescription from '../../components/task/TaskDescription'
import Timer from '../../components/timer/Timer'
import PromptingService from '../../services/PromptingService'



/**
 * The page where the actual game in form of communication with the api takes place.
 * 
 * @param config Config of the frontend
 * @param socket Socket client object
 * @param session Session client connected to
 * @param currentPlayer Model of current player
 * @param players Array of all players in the session
 * @returns 
 */
function InputPromptPage({ config, socket, session, currentPlayer, players }) {

    // Result Model
    const [result, setResult] = useState(null)

    // Round Model
    const round = { time: '30', task: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' }

    // Disable submit for the prompt input form
    const [disablePrompting, setDisablePrompting] = useState(false)

    
    // Call Back function for sending a text prompt to generate a text
    const sendPrompt = (prompt) => {
        
        // Check if Prompting should be allowed/Input is not null
        if (disablePrompting || !prompt) {
            return
        }

        // Show Prompt info snack bar
        promptInfoSnackBar()

        // Disable sending a new prompt
        setDisablePrompting(true)


        // Send text prompt and provide callback function
        PromptingService.sendTextPrompt(prompt, currentPlayer.playerNumber, session.sessionCode, (timestamp, result) => {

            //if successful, save result model and show success snack bar
            try {
                setResult(result)
                promptSuccessSnackBar()

            //if not succesful, show error snack bar
            } catch (error) {
                promptErrorSnackBar()
            }

            // allow sending prompt
            setDisablePrompting(false)
        })
    }

    //Snack Bars for prompting feedback
    const promptSuccessSnackBar = SuccessSnackBar('Prompt erfolgreich generiert!')
    const promptInfoSnackBar = InfoSnackBar('Prompt wird generiert! Bitte kurz warten.')
    const promptErrorSnackBar = ErrorSnackBar('Prompt konnte nicht generiert werden!')



    return (
        <>
            {   //check if socket connection has been established + players are loaded
                !socket && !players ? <LoadingSpinner />
                
                    : (
            
                    <>
                        {/*Task description*/}
                        
                        <Card >
                            <Timer seconds={round.time} />  
                        </Card>
                            

                        {/*Game progress*/}
                        
                            

                        {/*Prompt input form*/}
                        <Card>
                                
                            <h2 className='aufgabe2' style={{ fontSize: '50px', margin: '40px 20px' }}>Erstelle einen Brief für deinen Vorgesetzen, welcher 300 Wörter lang ist.</h2>   

                            <div style={{ margin: '60px 0' }} />    
                                

                            
                                
                            <PromptTextArea
                                placeholder='Hier wird das von der KI generierte Ergebnis angezeigt.'
                                    initialValue={result != null ? result.result : ''} />
                                
                            <div style={{margin: '60px 0'}}/>
                            
                            <PromptTextArea
                                enableInput={true}
                                onSubmitInput={sendPrompt}
                                disableInput={false}
                                disableSubmit={disablePrompting}
                                placeholder='Schreibe der KI, wie die Aufgabe gelöst werden soll.'
                                initialValue={ result != null ? result.prompt : '' }
                                />
                            
                        </Card>
                    </>
                
                ) 
            }
            

            {/* Outlet for BrowserRouter and ToastContainer for success snack bar */}
            <ToastContainer/>
            <Outlet />
        </>
    )

}

InputPromptPage.propTypes = {
    config: PropTypes.object,
    socket: PropTypes.object,
    session: PropTypes.object,
    currentPlayer: PropTypes.object,
    players: PropTypes.array
}

export default InputPromptPage