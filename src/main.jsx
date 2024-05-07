import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './screens/home/Home'
import CreateGamePage from './screens/createGame/CreateGame'
import SocketSessionConnector from './utils/wrappers/SocketSessionConnector'
import ConfigLoader from './utils/wrappers/ConfigLoader'
import ParticlesWrapper from './components/particles/ParticlesWrapper'
import ErrorMessage from './components/errorMessage/ErrorMessage'


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
                child={<SocketSessionConnector
                  child={<CreateGamePage />}
                />}
              />
                    }/>
      </ErrorMessage> ,
      loader: () => {
        return 1
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
