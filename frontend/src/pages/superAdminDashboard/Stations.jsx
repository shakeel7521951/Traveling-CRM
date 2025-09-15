import React from 'react'
import StationsHero from '../../components/superAdminDashboard/Stations/StationsHero'
import StationCampaigns from '../../components/superAdminDashboard/Stations/StationCampaigns'
 import StationGraph from '../../components/superAdminDashboard/Stations/StationGraph'

const Stations = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      {/* <StationsHero /> */}
      <StationCampaigns />
       {/* <StationGraph /> */}
    </div>
  )
}

export default Stations;