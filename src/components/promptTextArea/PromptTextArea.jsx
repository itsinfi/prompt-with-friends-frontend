import PropTypes from 'prop-types'
import './PromptTextArea.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { ErrorSnackBar } from '../../components/snackBar/SnackBar'


/**
 * Component to show an input/output field for prompting/communication with ai
 * 
 * @param enableInput true if this should be an input field, false if this should be an output field (read only)
 * @param onSubmitInput call back function to execute when pressing send button (only relevant for input field)
 * @param disableInput html disable attribute for the textarea (only relevant for input field)
 * @param disableSubmit html disable attribute for the submit button (only relevant for input field)
 * @param placeholder placeholder to show if value of text area is empty
 * @param initialValue value to display in initial state of the text area
 * @returns 
 */
function PromptTextArea({ enableInput = false, onSubmitInput = () => { }, disableInput = false, disableSubmit = false, placeholder = '', initialValue = ''}) {

    // update height of prompt text area dynamically when there is a new line added
    const [promptText, setPromptText] = useState(initialValue);
    
    // update value of text area on change and update height
    const onChange = (event) => {

        if (!enableInput) {
            return
        }

        const value = event.target.value;
        setPromptText(value);
    };
    
    // update height based on how many lines are needed
    const calculateRows = (text) => {
        return text.split('\n').length;
    };


    
    // update style of parent based on whether or not child is focused or not (not possible in css)
    const [promptTextAreaFocused, setPromptTextAreaFocused] = useState(false);
    
    // enable focus styling
    const onFocus = () => {
        setPromptTextAreaFocused(enableInput);
    };
    
    // disable focus styling
    const onBlur = () => {
        setPromptTextAreaFocused(false);
    };


    // listen for enter key press (without shift) to submit the input
    const onKeyDown = (event) => {

        if (!enableInput) {
            return
        }

        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()

            if (disableSubmit) {
                disableSubmitError()
                return
            }

            if (!promptText || promptText.isEmpty) {
                promptIsEmptyError()
                return
            }
    
            onSubmitInput(promptText)
        }

    }

    // Error to show if disableSubmit is true when submitting
    const disableSubmitError = ErrorSnackBar('Bitte warten, die Anfrage wird noch verarbeitet.')

    // Error to show if Prompt is empty when submitting
    const promptIsEmptyError = ErrorSnackBar('Bitte das Feld ausfüllen.')



    return <div className={`prompt-text-div ${enableInput ? 'aufgabe' : ''} ${promptTextAreaFocused ? 'prompt-text-div-focus' : ''}`}>
                                    

                {/* Text Area */}
                <textarea className={enableInput ? 'prompt-input' : 'prompt-output'}
                    disabled={disableInput}
                    readOnly={!enableInput}
                    value={enableInput ? promptText : initialValue}
                    placeholder={placeholder}
                    onChange={onChange}
                    rows={calculateRows(enableInput ? promptText : initialValue) > 1 ? calculateRows(enableInput ? promptText : initialValue) : 1}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown} />

                {/* Send Button (show only if textarea is an input field) */}
                {
                    enableInput ?
                        <button className='prompt-button' disabled={ disableSubmit } onClick={ () => { onSubmitInput(promptText) } }>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                    : ''
                }
                    
            </div>

}

PromptTextArea.propTypes = {
    enableInput: PropTypes.bool,
    onSubmitInput: PropTypes.func,
    disableInput: PropTypes.bool,
    disableSubmit: PropTypes.bool,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string
}


export default PromptTextArea