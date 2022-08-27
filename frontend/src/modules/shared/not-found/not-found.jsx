import React from 'react'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
import NotFoundComponent from './not-found-component/not-found-component'
import './not-found.css'

const NotFound = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='container not-found-page'>
        <NotFoundComponent/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default NotFound


