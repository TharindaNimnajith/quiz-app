import React, {useContext, useEffect, useState} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {admin, all, user} from '../shared/user-types'
import {AppContext} from '../global/app-context'
import {checkUserInLocalStorage} from '../helpers/local-storage.helpers'
import Loader from '../components/loader/loader'
import './route-filter.css'

const RouteFilter = (
  {
    component: Component,
    needAuthentication,
    userType,
    ...rest
  }
) => {
  const appContext = useContext(AppContext)

  const [authenticated, setAuthenticated] = useState(null)

  useEffect(() => {
    const localeStorageData = checkUserInLocalStorage()
    if (localeStorageData.status === true) {
      appContext.login(localeStorageData.result).then(() => {
      })
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [Component])

  return (
    <div>
      <Route {...rest}
             render={
               props => {
                 if (needAuthentication && authenticated === null) {
                   return (
                     <Loader/>
                   )
                 } else if (needAuthentication && !authenticated) {
                   return (
                     <Redirect to='/login'/>
                   )
                 } else if (!needAuthentication && authenticated) {
                   if (appContext.loginData && appContext.loginData.userType === admin) {
                     return (
                       <Redirect to='/dashboard'/>
                     )
                   } else if (appContext.loginData && appContext.loginData.userType === user) {
                     return (
                       <Redirect to='/home'/>
                     )
                   }
                 } else if (!needAuthentication) {
                   return (
                     <Component {...props} />
                   )
                 } else if (authenticated) {
                   if (userType === all || (appContext.loginData && appContext.loginData.userType === userType)) {
                     return (
                       <Component {...props} />
                     )
                   } else {
                     if (appContext.loginData && appContext.loginData.userType === admin) {
                       return (
                         <Redirect to='/dashboard'/>
                       )
                     } else if (appContext.loginData && appContext.loginData.userType === user) {
                       return (
                         <Redirect to='/home'/>
                       )
                     }
                   }
                 } else {
                   return (
                     <Loader/>
                   )
                 }
               }}/>
    </div>
  )
}

export default RouteFilter
