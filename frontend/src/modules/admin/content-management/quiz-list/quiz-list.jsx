import React from 'react'
import Header from '../../../../components/header/header'
import QuizListComponent from './quiz-list-component/quiz-list-component'
import './quiz-list.css'

const QuizList = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <h1 className='text-center text-uppercase mt-5 page-title'>
        Content Management
      </h1>
      <div className='container quiz-list-page'>
        <QuizListComponent history={props.history}/>
      </div>
    </div>
  )
}

export default QuizList
