import React, {Fragment, useContext, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Navbar, NavbarBrand} from 'reactstrap'
import {removeFromLocalStorage} from '../../helpers/local-storage.helpers'
import {authStoreKey} from '../../config/main.config'
import {AppContext} from '../../global/app-context'
import NavigationBar from '../navigation-bar/navigation-bar'
import './header.css'

const Header = props => {
  const appContext = useContext(AppContext)

  const [display, setDisplay] = useState(false)

  const onLogout = async () => {
    await removeFromLocalStorage(authStoreKey)
    await appContext.logout()
    props.history.push('/login')
  }

  const onNavBarDisplay = async () => {
    setDisplay(!display)
  }

  return (
    <div>
      <div>
        <Fragment>
          <Navbar className='header d-flex justify-content-between w-100'
                  expand='md'>
            <div className={appContext.loginData === null ? 'invisible' : ''}>
              <NavbarBrand>
                <i className='icon fas fa-bars ms-4'
                   onClick={onNavBarDisplay}/>
              </NavbarBrand>
            </div>
            <div>
              <label className='logo mb-0'>
                Welcome to iLearn - Start Your Learning Journey Today!
              </label>
            </div>
            <div className={appContext.loginData === null ? 'invisible' : ''}>
              <NavbarBrand>
                <i className='icon fas fa-sign-out-alt'
                   title='Logout'
                   onClick={onLogout}/>
              </NavbarBrand>
            </div>
          </Navbar>
        </Fragment>
      </div>
      <div>
        {
          display ? (
            <NavigationBar/>
          ) : null
        }
      </div>
    </div>
  )
}

export default withRouter(Header)
