import React, {useContext} from 'react'
import {Nav} from 'reactstrap'
import {AppContext} from '../../global/app-context'
import UserNavigationEntries from './user-navigation-entries/user-navigation-entries'
import AdminNavigationEntries from './admin-navigation-entries/admin-navigation-entries'
import './navigation-bar.css'

const NavigationBar = () => {
  const appContext = useContext(AppContext)

  return (
    <div className='sidebar'>
      {
        appContext.loginData && appContext.loginData.userType === 'User' ? (
          <div>
            <UserNavigationEntries/>
          </div>
        ) : appContext.loginData && appContext.loginData.userType === 'Admin' ? (
          <div>
            <AdminNavigationEntries/>
          </div>
        ) : (
          <div>
            <Nav vertical>
            </Nav>
          </div>
        )
      }
    </div>
  )
}

export default NavigationBar
