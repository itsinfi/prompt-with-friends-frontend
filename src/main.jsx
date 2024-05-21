import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './screens/home/Home'
import CreateGamePage from './screens/createGame/CreateGame'
import SessionConnector from './utils/SessionConnector'
import ConfigLoader from './utils/ConfigLoader'
import ParticlesWrapper from './components/particles/ParticlesWrapper'
import ErrorMessage from './components/errorMessage/ErrorMessage'
import SessionCreator from './utils/SessionCreator'
import InputPromptPage from './screens/inputPrompt/InputPrompt'
import VotingPage from './screens/voting/Voting'
import LeaderboardPage from './screens/leaderboard/Leaderboard'


/**
 * Define routes here
 */
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ParticlesWrapper child={ <HomePage/> } />,
      loader: () => {
        return 1
      },
      children: [
      ]
    },
    {
      path: "/createGame",
      element: <ErrorMessage>
          <ParticlesWrapper
            child={
              <ConfigLoader
              child={ <SessionCreator/> }
              />
                    }/>
      </ErrorMessage> ,
      loader: () => {
        return 1
      },
      children: [
      ]
    },
    {
      path: "/:session",
      element: <ErrorMessage>
          <ParticlesWrapper
            child={
              <ConfigLoader
                child={<SessionConnector
                  child={<VotingPage />}
                />}
              />
                    }/>
      </ErrorMessage> ,
      loader: ({ params }) => {
        return params.session
      },
      children: [
      ]
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    }
  },
);







//Render app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
