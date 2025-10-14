
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import HomeList from './pages/HomeList'
import HomeDetail from './pages/HomeDetail'
import HomeForm from './pages/HomeForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomeList /> },
      { path: 'homes/new', element: <HomeForm mode="create" /> },
      { path: 'homes/:id', element: <HomeDetail /> },
      { path: 'homes/:id/edit', element: <HomeForm mode="edit" /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
