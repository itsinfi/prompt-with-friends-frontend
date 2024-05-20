import PropTypes from 'prop-types'
import './Timer.css'
import formatTimer from '../../utils/formatTimer'


/**
 * A component that displays a time remaining (only displaying, timer logic needs to be implemented else where)
 * 
 * @param seconds seconds to display 
 * @param label optional label to say what happens when the timer stops 
 * @returns timer formatted to mm:ss
 */
const Timer = ({ seconds, label }) => {

    const time = formatTimer(seconds)
    
    return <div className='flex-column'>

                <h1
            className={`timer ${
                        seconds < 30
                                ? 'red-timer'
                                : seconds < 60
                                    ? 'yellow-timer'
                                    : ''
                        }`}>
                    { time }
                </h1>
                
        
                <h4 className='timer-label'>
                    {label ?? ''}
                </h4>

        
            </div>
}

Timer.propTypes = {
    seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string
}


export default Timer