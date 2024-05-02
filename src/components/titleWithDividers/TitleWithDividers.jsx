import PropTypes from 'prop-types'
import './TitleWithDividers.css'


/**
 * A component that displays a title with dividers to its left and right
 * 
 * @param title title to be displayed 
 * @returns Title with dividers
 */
const TitleWithDividers = ({ title }) => {
    
    return  (  <>
                    <div className='titleWithDividers'>
                        <div className='divider'></div>
                        <h1 className='title'>
                            {title}
                        </h1>
                        <div className='divider'></div>
                    </div>
                </>
            )
}

TitleWithDividers.propTypes = {
    title: PropTypes.string.isRequired,
}


export default TitleWithDividers