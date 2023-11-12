import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/styles/app.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './routes/Layout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        index: true,
        path: '/panel',
        element: <h1>Panel</h1>
      },
      {
        path:'/tasks',
        element: <h1>Tasks</h1>
      },
      {
        path:'/calendar',
        element: <h1>Calendar</h1>
      },
      {
        path:'/agenda',
        element: <h1>Agenda</h1>
      },
      {
        path:'/settings',
        element: <h1>Settings</h1>
      }
    ]
  }
  

  /* {
    path:'/panel',
    element: <h1>Panel</h1>
  },
  {
    path:'/tasks',
    element: <h1>Tasks</h1>
  },
  {
    path:'/calendar',
    element: <h1>Calendar</h1>
  },
  {
    path:'/agenda',
    element: <h1>Agenda</h1>
  },
  {
    path:'/settings',
    element: <h1>Settings</h1>
  }, */
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
