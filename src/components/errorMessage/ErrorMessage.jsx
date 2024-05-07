import React from "react";
import PropTypes from 'prop-types'
import Card from "../card/Card";
import './ErrorMessage.css'
import { Link } from "react-router-dom";


class ErrorMessage extends React.Component {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    }

    state = {
        hasError: false,
        error: null,
        errorInfo: null
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo
        })
        console.log(this.state)
    }

    render() {
        console.log(this.state.hasError)
        if (this.state.hasError) {
            return (
                <Card>
                    <div className="error-container">
                        <p className="error-text">{ `${this.state.error}` }</p>

                        <Link to='/' relative='path'>
                            <button className="error-button">Zurück</button>
                        </Link>
                    </div>
                </Card>
            )
        }

        return this.props.children;
    }

}

export default ErrorMessage