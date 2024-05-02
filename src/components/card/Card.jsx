import PropTypes from 'prop-types'
import './Card.css'

/**
 * A card component to use across the app to display its children on top
 * 
 * @param children children to display on top of the card
 * @returns Card with its children
 */
const Card = ({ children }) => {
    return  (
                <div className="card">
                    { children }
                </div>
            )
}

Card.propTypes = {
    children: PropTypes.node.isRequired
}

export default Card