import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Config from './utils/config'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './screens/home/Home'
import CreateGamePage from './screens/createGame/CreateGame'

//load config
await Config.loadConfig()


/**
 * Define routes here
 */
const router = createBrowserRouter(
  [{
    path: "/",
    element: <HomePage />,
    loader: () => {
      console.log('render home page')
      return 1
    },
    children: [
    ]
  },
  {
    path: "/createGame",
    element: <CreateGamePage config={ Config.config } />,
    loader: () => {
      console.log('render create game page')
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






/**
 * Render app
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)