import PropTypes from 'prop-types'
import './Timer.css'
import formatTimer from '../../utils/formatTimer'


/**
 * A component that displays a time remaining (only displaying, timer logic needs to be implemented else where)
 * 
 * @param seconds seconds to display (currently no support for more than 3599 seconds)
 * @param label optional label to say what happens when the timer stops 
 * @returns timer formatted to mm:ss
 */
const Timer = ({ seconds, label }) => {

    // format seconds to mm:ss
    const time = formatTimer(seconds)


    // set additional styling to none
    let additionalTimeStyle = ''

    // set additional styling to red if less than 30 seconds
    if (seconds < 30) {
        additionalTimeStyle = 'red-timer'

    // set additional styling to yellow if less than 60 seconds
    } else if (seconds < 60) {
        additionalTimeStyle = 'yellow-timer'
    }
        
        
    return <div className='flex-column'>

                <h1
                    className=
                        {`timer ${additionalTimeStyle}`}>
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