import './InputPrompt.css'
import { Outlet } from 'react-router-dom'
import Card from '../../components/card/Card'
import PlayerAvatar from '../../components/playerAvatar/PlayerAvatar'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { ErrorSnackBar, InfoSnackBar, SuccessSnackBar } from '../../components/snackBar/SnackBar'
import PropTypes from 'prop-types'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'
import PromptTextArea from '../../components/promptTextArea/PromptTextArea'
import TaskDescription from '../../components/task/TaskDescription'



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

    const result = { prompt: 'Ist Mayonaise ein Instrument, Thaddäus?', creator: '', result: 'Nein, Patrick, Mayonnaise ist kein Instrument. Und auch keine Kunstform, wie du vielleicht denkst. Aber sie kann auf eine köstliche Weise Teil von vielen Gerichten sein!' }

    const round = { time: '00:07', task: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' }


    //check whether conditions to start the game are met
    const [startGame, setStartGame] = useState(null)
    useEffect(() => {
        setStartGame(players.length > 1)
    }, [socket, players])


    //copy invite link to clipboard
    const sendPrompt = () => {
        promptInfoSnackBar()
        promptErrorSnackBar()
        // promptSuccessSnackBar()
    }

    //Snack Bars for prompting feedback
    const promptSuccessSnackBar = SuccessSnackBar('Prompt erfolgreich generiert!')
    const promptInfoSnackBar = InfoSnackBar('Prompt wird generiert! Bitte kurz warten.')
    const promptErrorSnackBar = ErrorSnackBar('Keine Verbindung!')



    return (
        <>
            {   //check if socket connection has been established + players are loaded
                !socket && !players ? <LoadingSpinner />
                
                    : (
            
                    <>
                        {/*Game progress*/}
                        <Card>
                            <h2>Spielfortschritt</h2>
                                
                            <h1>
                                { round.time }
                            </h1>
                        </Card>
                        
                        
                        {/*Task description*/}
                        <Card>
                            <h2 className='card-title'>Aufgabe</h2>

                            <TaskDescription description={round.task} />
                            
                        </Card>
                        
                        
                        {/*Prompt input form*/}
                        <Card>
                            <h2 className='card-title'>Eingabe</h2>
                            
                            <PromptTextArea
                                enableInput={true}
                                onSubmitInput={sendPrompt}
                                disableInput={false}
                                disableSend={false}
                                placeholder='Schreibe der KI, wie die Aufgabe gelöst werden soll.'
                                initialValue={ result != null ? result.prompt : '' }
                                />
                            
                        </Card>
                        
                        
                        {/*Result preview*/}
                        <Card>
                            <h2 className='card-title'>Vorschau</h2>
                            
                            <PromptTextArea
                                placeholder='Hier wird das von der KI generierte Ergebnis angezeigt.'
                                initialValue={ result != null ? result.result : '' } />
                            
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