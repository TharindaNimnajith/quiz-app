import React from 'react'
import Header from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'
import QuizzesComponent from './quizzes-component/quizzes-component'
import './quizzes.css'

const Quizzes = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <h1 className='text-center text-uppercase mt-5 page-title'>
        Quizzes
      </h1>
      <div className='container quizzes-page'>
        <QuizzesComponent history={props.history}/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Quizzes
