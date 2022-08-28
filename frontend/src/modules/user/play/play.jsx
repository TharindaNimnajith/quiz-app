import React, {useContext} from 'react'
import Header from '../../../components/header/header'
import {AppContext} from '../../../global/app-context'
import FinalComponent from './final-component/final-component'
import PlayComponent from './play-component/play-component'
import './play.css'

const Play = props => {
  const appContext = useContext(AppContext)

  return (
    <div>
      <div>
        <Header/>
      </div>
      {
        appContext.loginData.level === 'Done' ? (
          <div className='container'>
            <FinalComponent/>
          </div>
        ) : (
          <div className='container play-page'>
            <PlayComponent history={props.history}/>
          </div>
        )
      }
    </div>
  )
}

export default Play
