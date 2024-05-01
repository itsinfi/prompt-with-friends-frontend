import React from "react"
import PropTypes from 'prop-types'
import './TitleWithDividers.css'


/**
 * A component that displays a title with dividers to its left and right
 */
class TitleWithDividers extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    }
    render() {
        return  <>
                    <div className='titleWithDividers'>
                        <div className='divider'></div>
                        <h1 className='title'>
                            {this.props.title}
                        </h1>
                        <div className='divider'></div>
                    </div>
                </>
    }
}

export default TitleWithDividers