import './CreateGame.css'
import Card from '../../components/card/Card'
import { Outlet } from 'react-router-dom'

/**
 * Create Game Page where user can invite other players and start the game
 * 
 * @returns
 */
function CreateGamePage() {

    return (
        <>
            <Card>
                <h1>
                    test
                </h1>
                <h2>
                    test
                </h2>
                <h3>
                    test
                </h3>
                <h4>
                    test
                </h4>
                <h5>
                    test
                </h5>
                <h6>
                    test
                </h6>
                <p>
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                </p>
                <a>
                    test
                </a>
                <button>
                    test
                </button>
            </Card>
            <Outlet/>
        </>
    )
}

export default CreateGamePage