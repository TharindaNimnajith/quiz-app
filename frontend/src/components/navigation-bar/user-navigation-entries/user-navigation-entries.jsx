import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import './user-navigation-entries.css'

const UserNavigationEntries = () => {
  return (
    <div>
      <Nav vertical>
        <div>
          <NavItem>
            <NavLink href='/home'>
              <i className='fa fa-fw fa-home mx-2 my-1'/>
              <label>Home</label>
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink href='/play'>
              <i className='fa fa-fw fa-trophy mx-2 my-1'/>
              <label>Play</label>
            </NavLink>
          </NavItem>
        </div>
      </Nav>
    </div>
  )
}

export default UserNavigationEntries
