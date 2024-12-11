import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Landingpage from './pages/Landingpage.jsx'
import Signup from './pages/Signup.jsx'
import { Provider } from 'react-redux'
import store, { persistor } from './Store/store.js'
import Video from './pages/VideoPage.jsx'
import VideoPage from './pages/VideoPage.jsx'
import ProtectedRoute from './conf/ProtectedRoute.jsx'
import { PersistGate } from 'redux-persist/integration/react';
import Upload from './pages/Upload.jsx'
import Tweet from './pages/Tweet.jsx'


const router = createBrowserRouter([
  {
    // path: "/",
    // element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Landingpage />
          </ProtectedRoute>
        )

      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/video",
        element: (
          <ProtectedRoute>
            <VideoPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/upload",
        element: (
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        )
      },{
        path:"/chat", 
        element: (
          <ProtectedRoute>
            <Tweet />
          </ProtectedRoute>
        )
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
        < RouterProvider router={router} />
      </PersistGate>

    </Provider>
  </StrictMode>,
)
