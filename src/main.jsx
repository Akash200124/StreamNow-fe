import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Landingpage from './pages/Landingpage.jsx'
import Signup from './pages/Signup.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'



const router = createBrowserRouter([
  {
    // path: "/",
    // element: <App />,
    children: [
      {
        path: "/",
        element: <Landingpage />

      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      < RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
