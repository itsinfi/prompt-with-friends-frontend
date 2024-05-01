import { BrowserRouter as Router, Route, Switch } from 'react-dom';
import HomePage from './screens/start/Home';
import CreateGamePage from './screens/createGame/CreateGame';

function App() {
    return (
        <Router>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/createGame" component={CreateGamePage} />
        </Switch>
        </Router>
    );
}

export default App;