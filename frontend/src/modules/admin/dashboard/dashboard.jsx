import React from 'react'
import Header from '../../../components/header/header'
import AdminDashboardComponent from './admin-dashboard-component/admin-dashboard-component'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='dashboard-page'>
        <AdminDashboardComponent/>
      </div>
    </div>
  )
}

export default Dashboard
