import React from 'react'
import './final-component.css'

const FinalComponent = () => {
  return (
    <div className='text-center my-5'>
      <h1 className='text-uppercase my-5 header-text'>
        Congratulations!!!
      </h1>
      <i className='fa-solid fa-award award-icon my-5'/>
      <h2 className='my-5'>
        You have successfully completed all quizzes!
      </h2>
    </div>
  )
}

export default FinalComponent
