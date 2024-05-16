import PropTypes from 'prop-types'
import './PromptTextArea.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'



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
function PromptTextArea({ enableInput = false, onSubmitInput = () => { }, disableInput = false, disableSubmit = false, placeholder = '', initialValue = '' }) {

    // update height of prompt text area dynamically when there is a new line added
    const [promptText, setPromptText] = useState(initialValue);
    
    // update value of text on change and update height
    const onChange = (event) => {
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
        setPromptTextAreaFocused(true);
    };
    
    // disable focus styling
    const onBlur = () => {
        setPromptTextAreaFocused(false);
    };



    return <div className={`prompt-text-div ${promptTextAreaFocused ? 'prompt-text-div-focus' : ''}`}>
                                    
                <textarea className='prompt-input'
                    disabled={disableInput}
                    readOnly={!enableInput}
                    value={enableInput ? promptText : initialValue}
                    placeholder={placeholder}
                    onChange={onChange}
                    rows={calculateRows(promptText) > 1 ? calculateRows(promptText) : 1}
                    onFocus={onFocus}
                    onBlur={onBlur} />
                        
                {
                    enableInput ?
                        <button className='prompt-button' disabled={ disableSubmit } onClick={ onSubmitInput }>
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