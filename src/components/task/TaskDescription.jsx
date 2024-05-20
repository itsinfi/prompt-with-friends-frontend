import { PropTypes } from 'prop-types'
import './TaskDescription.css'


/**
 * Component to visualize the description of a task
 * 
 * @param description description of the task
 * @returns 
 */
const TaskDescription = ({ description = '' }) => {
    
    return <h2
                className='task'>
                { description }
            </h2>  

}

TaskDescription.propTypes = {
    description: PropTypes.string
}

export default TaskDescription