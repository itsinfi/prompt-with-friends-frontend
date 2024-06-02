import { PropTypes } from 'prop-types'
import './TaskDescription.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'


/**
 * Component to visualize the description of a task
 * 
 * @param description description of the task
 * @returns 
 */
const TaskDescription = ({ description = '', tip = '' }) => {
    
    if (tip) {
        return <div className='task-row'>
                    <h2 className='task tooltip'>
                        {description}
                        <span className='tooltip-text'>
                            {tip}
                        </span>
                    </h2>
                </div>
        


    } else {
        return <h2 className='task'>
                    {description}
                </h2>
    }

}

TaskDescription.propTypes = {
    description: PropTypes.string,
    tip: PropTypes.string
}

export default TaskDescription