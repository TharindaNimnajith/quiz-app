import React from 'react'
import Header from '../../../../components/header/header'
import SingleQuizComponent from './single-quiz-component/single-quiz-component'
import './single-quiz.css'

const SingleQuiz = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='container single-quiz-page'>
        <SingleQuizComponent history={props.history}/>
      </div>
    </div>
  )
}

export default SingleQuiz
