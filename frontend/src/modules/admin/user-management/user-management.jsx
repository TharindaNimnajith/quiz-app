import React from 'react'
import Header from '../../../components/header/header'
import UserManagementComponent from './user-management-component/user-management-component'
import './user-management.css'

const UserManagement = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <h1 className='text-center text-uppercase mt-5 page-title'>
        User Management
      </h1>
      <div className='container user-management-page'>
        <UserManagementComponent/>
      </div>
    </div>
  )
}

export default UserManagement
