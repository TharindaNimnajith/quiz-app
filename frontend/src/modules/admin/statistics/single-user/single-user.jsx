import React from 'react'
import Header from '../../../../components/header/header'
import SingleUserComponent from './single-user-component/single-user-component'
import './single-user.css'

const SingleUser = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='container single-user-page'>
        <SingleUserComponent history={props.history}/>
      </div>
    </div>
  )
}

export default SingleUser
