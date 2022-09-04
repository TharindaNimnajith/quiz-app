import React from 'react'
import Header from '../../../../components/header/header'
import AddQuizComponent from './add-quiz-component/add-quiz-component'
import './add-quiz.css'

const AddQuiz = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='add-quiz-page'>
        <AddQuizComponent history={props.history}/>
      </div>
    </div>
  )
}

export default AddQuiz
