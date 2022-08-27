import React from 'react'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
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
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Dashboard
