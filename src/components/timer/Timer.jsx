import PropTypes from 'prop-types'
import './Timer.css'
import formatTimer from '../../utils/formatTimer'


/**
 * A component that displays a time remaining (only displaying, timer logic needs to be implemented else where)
 * 
 * @param seconds seconds to display 
 * @returns timer formatted to mm:ss
 */
const Timer = ({ seconds }) => {

    const time = formatTimer(seconds)
    
    return  <h1
            
                className={seconds < 30
                    ? 'red-timer'
                    : seconds < 60
                        ? 'yellow-timer'
                        : ''}>

                { time }
            </h1>
}

Timer.propTypes = {
    seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}


export default Timer