import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import SideBaar from "./components/common/SideBaar";
import Home from "./pages/Home";
import Passengers from "./pages/Passengers";
import Campaigns from "./pages/Campaigns";
import Feedback from "./pages/Feedback";
import Complaints from "./pages/Complaints";
import Setting from "./pages/Setting";

import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { useMyProfileQuery } from "./redux/slices/UserSlice";
import { useEffect } from "react";
import { setProfile } from "./redux/slices/UserProfile";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import TravelFeedbackPortal from "./pages/TravelFeedbackPortal";
import SuperAdminSidebaar from "./components/superAdminDashboard/common/Sidebaar";
import SuperAdminNavbar from "./components/superAdminDashboard/common/Navbar";
import SuperAdminCompaigns from "./pages/superAdminDashboard/Compaigns";
import Overview from "./pages/superAdminDashboard/Overview";
import Stations from "./pages/superAdminDashboard/Stations";
import ViewDetail from "./components/superAdminDashboard/Stations/ViewDetail";
import SupFeedback from "./pages/superAdminDashboard/SepFeedback";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SupComplaints from "./pages/superAdminDashboard/SupComplaints";
import SupSetting from "./pages/superAdminDashboard/SupSetting";

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

const SuperAdminLayout = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <SuperAdminNavbar  />
        <div className="flex flex-1 overflow-hidden">
          <SuperAdminSidebaar />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: (<ProtectedRoute><MainLayout /></ProtectedRoute>),
    children: [
      { path: "/", element: <Home /> },
      { path: "/passengers", element: <Passengers /> },
      { path: "/campaigns", element: <Campaigns /> },
      { path: "/feedback", element: <Feedback /> },
      { path: "/complaints", element: <Complaints /> },
      
      { path: "/setting", element: <Setting /> },
    
    ],
  },
  { path: "/travel-feedback-portal", element: <TravelFeedbackPortal /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  {
    path: "/superadmin",
    element: <SuperAdminLayout />,
    children: [
      { path: "overview", element: <Overview /> },
      { path: "stations", element: <Stations /> },
      { path: "viewdetail/:id", element: <ViewDetail /> },
      { path: "compaigns", element: <SuperAdminCompaigns /> },
      { path: "supfeedback", element: <SupFeedback /> },
      { path: "supcomplaints", element: <SupComplaints /> },
      { path: "setting", element: <SupSetting /> },
    ]
  }
]);

function App() {
  const disptach = useDispatch();
  const { data: profile } = useMyProfileQuery();
  useEffect(() => {
    if (profile?.user) {
      disptach(setProfile(profile?.user));
    }
  }, [profile, disptach]);
  return <RouterProvider router={router} />;
}

export default App;
