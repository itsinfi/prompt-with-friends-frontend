import PropTypes from 'prop-types'
import './Card.css'

/**
 * A card component to use across the app to display its children on top
 * 
 * @param children children to display on top of the card
 * @param disableMargin disable default margin of 40px
 * @param isSelected show green borders around card to signify selection status
 * @returns Card with its children
 */
const Card = ({ children, disableMargin = false, isSelected = false }) => {

    console.log(`isSelected card: ${isSelected}`)

    return  (
                <div className={`${isSelected ? 'card-selected' : ''} card ${disableMargin ? '' : 'm-40'}`}>
                    { children }
                </div>
            )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    disableMargin: PropTypes.bool,
    isSelected: PropTypes.bool
}

export default Card