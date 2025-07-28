import KPISection from '../components/adminHome/KPISection'
import FeedbackRatingSummary from '../components/adminHome/FeedbackRatingSummary'
import StationLeaderboard from '../components/adminHome/StationLeaderboard'
import CampaignEngagementChart from '../components/adminHome/CampaignEngagementChart'
import RecentActivityTimeline from '../components/adminHome/RecentActivityTimeline'
import PassengerDataOverview from '../components/adminHome/PassengerDataOverview'
export default function AdminHome() {
  return (
    <div>
      <KPISection title="Total Flights" value='120'/>
    

      <PassengerDataOverview />
      <div className=' flex flex-wrap '>
        <FeedbackRatingSummary />
        <StationLeaderboard />
      </div>
      <CampaignEngagementChart />
      <RecentActivityTimeline/>
    </div>
  )
}
