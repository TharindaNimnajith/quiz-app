import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Card, CardBody} from 'reactstrap'
import axios from 'axios'
import {quizzesApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import ButtonComponent from '../../../../../components/button/button'
import TextField from '../../../../../components/text-field/text-field'
import './single-quiz-component.css'

const SingleQuizComponent = props => {
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const [quizTitle, setQuizTitle] = useState('')
  const [lesson, setLesson] = useState('')
  const [quizLevel, setQuizLevel] = useState('')
  const [questions, setQuestions] = useState([])

  const {
    id
  } = useParams()

  useEffect(() => {
    loadData().then(() => {
    })
  }, [])

  const loadData = async () => {
    setLoader(true)
    axios.get(`${quizzesApi}quizzes/${id}`).then(res => {
      let data = res.data.quiz
      setQuizTitle(data.quizTitle)
      setLesson(data.lesson)
      setQuizLevel(data.quizLevel)
      setQuestions(data.questions)
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  const onClick = async () => {
    props.history.push('/content-management')
  }

  return (
    <div className='quiz-wrapper'>
      {
        loader ? (
          <Loader/>
        ) : null
      }
      <div>
        <div className='mb-4'>
          <ButtonComponent btnText='Quiz List'
                           isFullWidth={false}
                           disabled={false}
                           onClickFn={onClick}/>
        </div>
        <div>
          <Card className='overflow-hidden'>
            <div className='quiz-header'>
              <div className='text-primary text-center p-4'>
                <h1 className='text-white font-size-20 text-uppercase'>
                  QUIZ - {quizTitle}
                </h1>
              </div>
            </div>
            <CardBody className='p-4'>
              <div>
                <small>
                  {
                    error ? (
                      <span className='p-3 error'>
                        {error}
                      </span>
                    ) : null
                  }
                </small>
              </div>
              <div className='p-3'>
                <div>
                  <TextField labelText='Quiz Title'
                             value={quizTitle}
                             disabled={true}/>
                </div>
                <div>
                  <TextField labelText='Quiz Description'
                             type='textarea'
                             value={lesson}
                             disabled={true}/>
                </div>
                <div>
                  <TextField labelText='Quiz Level'
                             value={quizLevel}
                             disabled={true}/>
                </div>
                <div>
                  {
                    questions && questions.map(item => {
                      return (
                        <div className='card bg-light p-3 mt-5'
                             key={item.question}>
                          <div>
                            <TextField labelText='Question'
                                       type='textarea'
                                       value={item.question}
                                       disabled={true}/>
                          </div>
                          <div>
                            <TextField labelText='Hints'
                                       type='textarea'
                                       value={item.hints}
                                       disabled={true}/>
                          </div>
                          <div>
                            <TextField labelText='Answer 1'
                                       type='textarea'
                                       value={item.answer1}
                                       disabled={true}/>
                          </div>
                          <div>
                            <TextField labelText='Answer 2'
                                       type='textarea'
                                       value={item.answer2}
                                       disabled={true}/>
                          </div>
                          <div>
                            <TextField labelText='Answer 3'
                                       type='textarea'
                                       value={item.answer3}
                                       disabled={true}/>
                          </div>
                          <div>
                            <TextField labelText='Answer 4'
                                       type='textarea'
                                       value={item.answer4}
                                       disabled={true}/>
                          </div>
                          <div>
                            <TextField labelText='Correct Answer'
                                       value={item.correctAnswer}
                                       disabled={true}/>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SingleQuizComponent
