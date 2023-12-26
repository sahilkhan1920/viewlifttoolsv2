import SubscribersReport from './SubscribersReport'
import UserBehaviourReport from './UserBehaviourReport'
import StreamingDuration from './StreamingDuration'
import TopContentReport from './TopContentReport'
import CommonHeader from '../common/CommonHeader'

const AnalyticsReport = () => {
  return (
    <>
      <CommonHeader />
      <SubscribersReport />
      <UserBehaviourReport />
      <StreamingDuration />
      <TopContentReport />
    </>
  )
}

export default AnalyticsReport
