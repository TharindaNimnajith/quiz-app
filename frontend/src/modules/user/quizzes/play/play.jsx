import React from 'react'
import Header from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'
import PlayComponent from './play-component/play-component'
import './play.css'

const Play = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='container play-page'>
        <PlayComponent history={props.history}/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Play
