import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import './admin-navigation-entries.css'

const AdminNavigationEntries = () => {
  return (
    <div>
      <Nav vertical>
        <div>
          <NavItem>
            <NavLink href='/dashboard'>
              <i className='fa fa-fw fa-home m-1'/>
              <label>Home</label>
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink href='/user-management'>
              <i className='fa fa-fw fa-user m-1'/>
              <label>Users</label>
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink href='/content-management'>
              <i className='fa fa-fw fa-book m-1'/>
              <label>Content</label>
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink href='/add-quiz'>
              <i className='fa fa-fw fa-question m-1'/>
              <label>New Quiz</label>
            </NavLink>
          </NavItem>
        </div>
      </Nav>
    </div>
  )
}

export default AdminNavigationEntries
