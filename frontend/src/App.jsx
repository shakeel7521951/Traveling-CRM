import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/common/Navbar'
import SideBaar from './components/common/SideBaar' 
import Home from './pages/Home'
import Passengers from './pages/Passengers'
import Campaigns from './pages/Campaigns'
import Feedback from './pages/Feedback'
import Reports from './pages/Reports'
import Setting from './pages/Setting'
import AdminHome from './pages/AdminHome'

const MainLayout = () => { 
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBaar />
        <main className="flex-1 overflow-auto"> 
          <Outlet />
        </main>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/passengers", element: <Passengers /> },
      { path: "/campaigns", element: <Campaigns /> },
      { path: "/feedback", element: <Feedback /> },
      { path: "/reports", element: <Reports /> },
      { path: "/setting", element: <Setting /> },
      { path: "/admin", element: <AdminHome /> }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App