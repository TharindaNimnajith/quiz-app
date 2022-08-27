import React from 'react'
import Header from '../../../../components/header/header'
import LeaderboardComponent from './leaderboard-component/leaderboard-component'
import './leaderboard.css'

const Leaderboard = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <h1 className='text-center text-uppercase mt-5 page-title'>
        Leaderboard
      </h1>
      <div className='container leaderboard-page'>
        <LeaderboardComponent history={props.history}/>
      </div>
    </div>
  )
}

export default Leaderboard
