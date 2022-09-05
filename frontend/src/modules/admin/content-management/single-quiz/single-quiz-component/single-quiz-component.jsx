import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Card, CardBody, Label} from 'reactstrap'
import axios from 'axios'
import {quizzesApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import ButtonComponent from '../../../../../components/button/button'
import TextField from '../../../../../components/text-field/text-field'
import './single-quiz-component.css'
import parse from "html-react-parser";

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
                  {quizTitle}
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
                  <TextField labelText='Lesson'
                             value={lesson}
                             disabled={true}/>
                </div>
                <div>
                  <TextField labelText='Quiz Level'
                             value={quizLevel}
                             disabled={true}/>
                </div>
                <div className='custom'>
                  {
                    questions && questions.map((item, index) => {
                      return (
                        <div key={index}
                             className='card bg-light px-4 py-2 mt-5'>
                          <div className='my-3 counter'>
                            {index + 1}
                          </div>
                          <div className='my-2'>
                            <Label>
                              Question
                            </Label>
                            <div className='border-style p-3'>
                              {
                                parse(item.question)
                              }
                            </div>
                          </div>
                          {
                            item.hints && (
                              <div className='my-2'>
                                <Label>
                                  Hints
                                </Label>
                                <div className='border-style p-3'>
                                  {
                                    parse(item.hints)
                                  }
                                </div>
                              </div>
                            )
                          }
                          <div className='my-2'>
                            <Label>
                              Answer 1
                            </Label>
                            <div className='border-style p-3'>
                              {
                                parse(item.answer1)
                              }
                            </div>
                          </div>
                          <div className='my-2'>
                            <Label>
                              Answer 2
                            </Label>
                            <div className='border-style p-3'>
                              {
                                parse(item.answer2)
                              }
                            </div>
                          </div>
                          <div>
                            <Label className='my-2'>
                              Answer 3
                            </Label>
                            <div className='border-style p-3'>
                              {
                                parse(item.answer3)
                              }
                            </div>
                          </div>
                          <div>
                            <Label className='my-2'>
                              Answer 4
                            </Label>
                            <div className='border-style p-3'>
                              {
                                parse(item.answer4)
                              }
                            </div>
                          </div>
                          <div>
                            <Label className='my-2'>
                              Answer 5
                            </Label>
                            <div className='border-style p-3'>
                              {
                                parse(item.answer5)
                              }
                            </div>
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
