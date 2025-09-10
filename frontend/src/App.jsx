import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import SideBaar from "./components/common/SideBaar";
import Home from "./pages/Home";
import Passengers from "./pages/Passengers";
import Campaigns from "./pages/Campaigns";
import Feedback from "./pages/Feedback";
import Complaints from "./pages/Complaints";
import Reports from "./pages/Reports";
import Setting from "./pages/Setting";
import AdminHome from "./pages/AdminHome";
import AllStations from "./pages/AllStations";
import StationDetails from "./pages/StationDetails";
import StationPassengers from "./components/AllStations/StationPassengers";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { useMyProfileQuery } from "./redux/slices/UserSlice";
import { useEffect } from "react";
import { setProfile } from "./redux/slices/UserProfile";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import TravelFeedbackPortal from "./pages/TravelFeedbackPortal";

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
  );
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/passengers", element: <Passengers /> },
      { path: "/campaigns", element: <Campaigns /> },
      { path: "/feedback", element: <Feedback /> },
      { path: "/complaints", element: <Complaints /> },
      { path: "/reports", element: <Reports /> },
      { path: "/setting", element: <Setting /> },
      { path: "/admin", element: <AdminHome /> },
      { path: "/all-stations", element: <AllStations /> },
      { path: "/stationsdetail/:id", element: <StationDetails /> },
      { path: "/station-passengers", element: <StationPassengers /> },
    ],
  },
    {path:'/travel-feedback-portal',element:<TravelFeedbackPortal />},
  {path:"/login",element:<Login />},
  {path:"/signup",element:<Signup />},
  {path:"/verify-otp",element:<VerifyOtp />},
]);

function App() {
  const disptach = useDispatch();
  const {data:profile} = useMyProfileQuery();
  useEffect(()=>{
    if(profile?.user){
      disptach(setProfile(profile?.user))
    }
  },[profile,disptach])
  return <RouterProvider router={router} />;
}

export default App;
