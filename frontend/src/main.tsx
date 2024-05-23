import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './Login.tsx'
import AuthPage from './AuthPage'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// TODO: We can clean this up very much how we did in our experience with Vue.js apps
// Put this in a separate file and then export it up to this main.tsx file
// see the following for docs on appropriate configuration:
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/auth',
        element: <AuthPage />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
