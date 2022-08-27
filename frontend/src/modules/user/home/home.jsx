import React from 'react'
import Header from '../../../components/header/header'
import UserHomeComponent from './user-home-component/user-home-component'
import './home.css'

const Home = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='home-page'>
        <UserHomeComponent/>
      </div>
    </div>
  )
}

export default Home
