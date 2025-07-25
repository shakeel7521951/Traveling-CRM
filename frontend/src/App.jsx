import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/common/Navbar'
import SideBaar from './components/common/SideBaar'
import Home from './pages/Home'

const MainFunction = ()=>{
  return(
    <div>
      <Navbar />
      <SideBaar />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element:<MainFunction />,
    children:[
      {path:"/",element:<Home />}
    ]
  }
])

function App() {

  return (
   <RouterProvider router={router} />
  )
}

export default App
