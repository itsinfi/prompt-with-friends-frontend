import './Home.css'
import TitleWithDividers from '../../components/titleWithDividers/TitleWithDividers'
// import Link from 'react-router-dom';




/**
 * Home Page where user click a button to create a new game
 * 
 * @returns
 */
function HomePage() {

  return (
    <>
      <div className='js-count-particles'>
        <TitleWithDividers title='PromptWithFriends'/>
        
        <button className='createSession'>
          {/* <Link to="/createGame">Spiel erstellen</Link> */}
          Spiel erstellen
        </button>
      </div>
    </>
  )
}

export default HomePage
