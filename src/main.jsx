import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/styles/app.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Layout from './routes/Layout.jsx';
import Agenda from './routes/Agenda.jsx'
import Notes from './routes/Notes.jsx'
import Panel from './routes/Panel.jsx'
import Settings from './routes/Settings.jsx'
import Tasks from './routes/Tasks.jsx'
import Schedule from './routes/Schedule.jsx';

const router = createBrowserRouter([
  {
    path: '/about',
    element: <h1>About</h1>
  },
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        index: true,
        path: '/',
        element: <Panel />
      },
      {
        path:'/tasks',
        element: <Tasks />
      },
      {
        path:'/notes',
        element: <Notes />
      },
      {
        path:'/agenda',
        element: <Agenda />
      },
      {
        path:'/schedule',
        element: <Schedule />
      },
      {
        path:'/settings',
        element: <Settings />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
