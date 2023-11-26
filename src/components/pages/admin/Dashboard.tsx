import '../../../styles/admin.css'
import Summary from './Summary'
import AuthBar from '../../shared/AuthBar'
import DashboardType from '../../shared/DashboardType'
import { useState, useEffect } from 'react'
import UserDetail from './UserDetail'
import PhotoDetail from './PhotoDetail'
import Gestion from './Gestion'

const Dashboard = () => {
  const [dashboardType, setDashboardType] = useState<DashboardType>(DashboardType.DASHBOARD_SUMMARY)

  useEffect(() => {
    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
      if (button.value === dashboardType) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    })
  }, [dashboardType])
  
  const togglePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const dashboardType = event.currentTarget.value
    setDashboardType(dashboardType as DashboardType)
  }

  return (
    <div className="dashboard-container">
      <AuthBar />
      {dashboardType === DashboardType.DASHBOARD_SUMMARY && <Summary />}
      {dashboardType === DashboardType.DASHBOARD_USER_DETAIL && <UserDetail />}
      {dashboardType === DashboardType.DASHBOARD_PHOTO_DETAIL && <PhotoDetail />}
      {dashboardType === DashboardType.DASHBOARD_GESTION && <Gestion />}
      <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={togglePage} value={DashboardType.DASHBOARD_SUMMARY}>{DashboardType.DASHBOARD_SUMMARY}</button>
        </li>
        <li className="page-item">
        <button className="page-link" onClick={togglePage} value={DashboardType.DASHBOARD_USER_DETAIL}>{DashboardType.DASHBOARD_USER_DETAIL}</button>
        </li>
        <li className="page-item">
        <button className="page-link" onClick={togglePage} value={DashboardType.DASHBOARD_PHOTO_DETAIL}>{DashboardType.DASHBOARD_PHOTO_DETAIL}</button>
        </li>
        <li className="page-item">
        <button className="page-link" onClick={togglePage} value={DashboardType.DASHBOARD_GESTION}>{DashboardType.DASHBOARD_GESTION}</button>
        </li>
      </ul>
    </nav>
    </div>
  )
}

export default Dashboard

