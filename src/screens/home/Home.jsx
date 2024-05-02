import './Home.css'
import TitleWithDividers from '../../components/titleWithDividers/TitleWithDividers'
import { Outlet, Link }  from 'react-router-dom';




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
        
        <Link to='/createGame' relative='path'>
          <button className='createSession'>
            Spiel erstellen
          </button>
        </Link>
      </div>
      <Outlet/>
    </>
  )
}

export default HomePage
