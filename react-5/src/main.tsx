import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './Layout.tsx'
import { About, Contact, Github } from './component/index.ts'
import { getUserInfo } from './component/Github/Github'
import User from './component/User/User.tsx'
const router = createBrowserRouter(
  [{
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'user/:userId',
        element: <User />
      },
      {
        path: "github/:username",
        element: <Github />,
        loader: getUserInfo
      },

    ]
  }]
)

// const router = createBrowserRouter([
//   <Route path='/' element={<Layout />}>

//   </Route>
// ])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
