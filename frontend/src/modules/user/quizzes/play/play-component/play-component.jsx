import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import useWindowSize from 'react-use/lib/useWindowSize'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import Confetti from 'react-confetti'
import axios from 'axios'
import {isEmpty} from '../../../../../helpers/common.helpers'
import {quizzesApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import ButtonComponent from '../../../../../components/button/button'
import TextField from '../../../../../components/text-field/text-field'
import './play-component.css'

const PlayComponent = props => {
  const {width, height} = useWindowSize()

  const [successModal, setSuccessModal] = useState(false)

  const helperAnswer1 = 'Please enter the answer for question 1.'
  const helperAnswer2 = 'Please enter the answer for question 2.'
  const helperAnswer3 = 'Please enter the answer for question 3.'

  const [loader, setLoader] = useState(false)

  const [userAnswer1, setUserAnswer1] = useState('')
  const [userAnswer2, setUserAnswer2] = useState('')
  const [userAnswer3, setUserAnswer3] = useState('')

  const [data, setData] = useState(null)

  const [errorAnswer1, setErrorAnswer1] = useState('')
  const [errorAnswer2, setErrorAnswer2] = useState('')
  const [errorAnswer3, setErrorAnswer3] = useState('')

  const [answer1Valid, setAnswer1Valid] = useState(false)
  const [answer2Valid, setAnswer2Valid] = useState(false)
  const [answer3Valid, setAnswer3Valid] = useState(false)

  const [markResults, setMarkResults] = useState(false)

  const [answer1Correct, setAnswer1Correct] = useState(false)
  const [answer2Correct, setAnswer2Correct] = useState(false)
  const [answer3Correct, setAnswer3Correct] = useState(false)

  const [error, setError] = useState('')

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
      setData(res.data.quiz)
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  const onChangeAnswer1 = async event => {
    setMarkResults(false)
    setUserAnswer1(event.value)
    setAnswer1Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorAnswer1('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorAnswer1('Please enter a valid answer.')
    }
    if (event.value.trim() === data.questions[0].answer) {
      setAnswer1Correct(true)
    } else {
      setAnswer1Correct(false)
    }
  }

  const onChangeAnswer2 = async event => {
    setMarkResults(false)
    setUserAnswer2(event.value)
    setAnswer2Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorAnswer2('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorAnswer2('Please enter a valid answer.')
    }
    if (event.value.trim() === data.questions[1].answer) {
      setAnswer2Correct(true)
    } else {
      setAnswer2Correct(false)
    }
  }

  const onChangeAnswer3 = async event => {
    setMarkResults(false)
    setUserAnswer3(event.value)
    setAnswer3Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorAnswer3('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorAnswer3('Please enter a valid answer.')
    }
    if (event.value.trim() === data.questions[2].answer) {
      setAnswer3Correct(true)
    } else {
      setAnswer3Correct(false)
    }
  }

  function isDisabled() {
    return !answer1Valid || !answer2Valid || !answer3Valid
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const onClick = async () => {
    props.history.push('/quizzes')
  }

  const onSubmit = async () => {
    setMarkResults(true)
    if (answer1Correct && answer2Correct && answer3Correct) {
      await toggleSuccessModal()
    }
  }

  return (
    <div>
      {
        loader ? (
          <Loader/>
        ) : null
      }
      <div>
        {
          markResults && answer1Correct && answer2Correct && answer3Correct ? (
            <Confetti width={width}
                      height={height}/>
          ) : null
        }
      </div>
      <div>
        <Modal isOpen={successModal}
               toggle={toggleSuccessModal}
               className='modal-close'>
          <ModalHeader toggle={toggleSuccessModal}
                       className='text-uppercase title'>
            Congratulations!
          </ModalHeader>
          <ModalBody>
            You got all answers correct!
          </ModalBody>
          <ModalFooter>
            <ButtonComponent btnText={'Ok'}
                             isFullWidth={false}
                             elementStyle={'ok-button'}
                             disabled={false}
                             onClickFn={onClick}/>
          </ModalFooter>
        </Modal>
      </div>
      <div>
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
        {
          data ? (
            <div>
              <div>
                <h1 className='text-center text-uppercase m-4 page-title'>
                  {data.quizTitle}
                </h1>
                <label className='m-4 mb-5'>
                  {data.quizDescription}
                </label>
              </div>
              <div>
                <div className='mb-5'>
                  <TextField isRequired={true}
                             labelText={data.questions[0].question}
                             name={'answer1'}
                             value={userAnswer1}
                             errorText={errorAnswer1}
                             helperText={helperAnswer1}
                             maxLength={50}
                             onChangeFn={event => onChangeAnswer1(event)}/>
                  {
                    markResults && answer1Correct ? (
                      <span>
                        <small className='text-success'>
                          Correct Answer!
                        </small>
                      </span>
                    ) : markResults && !answer1Correct ? (
                      <span>
                        <small className='text-danger'>
                          Sorry, You got this wrong. Please try again!
                        </small>
                    </span>
                    ) : null
                  }
                </div>
                <div className='mb-5'>
                  <TextField isRequired={true}
                             labelText={data.questions[1].question}
                             name={'answer2'}
                             value={userAnswer2}
                             errorText={errorAnswer2}
                             helperText={helperAnswer2}
                             maxLength={50}
                             onChangeFn={event => onChangeAnswer2(event)}/>
                  {
                    markResults && answer2Correct ? (
                      <span>
                        <small className='text-success'>
                          Correct Answer!
                        </small>
                      </span>
                    ) : markResults && !answer2Correct ? (
                      <span>
                        <small className='text-danger'>
                          Sorry, You got this wrong. Please try again!
                        </small>
                    </span>
                    ) : null
                  }
                </div>
                <div className='mb-5'>
                  <TextField isRequired={true}
                             labelText={data.questions[2].question}
                             name={'answer3'}
                             value={userAnswer3}
                             errorText={errorAnswer3}
                             helperText={helperAnswer3}
                             maxLength={50}
                             onChangeFn={event => onChangeAnswer3(event)}/>
                  {
                    markResults && answer3Correct ? (
                      <span>
                        <small className='text-success'>
                          Correct Answer!
                        </small>
                      </span>
                    ) : markResults && !answer3Correct ? (
                      <span>
                        <small className='text-danger'>
                          Sorry, You got this wrong. Please try again!
                        </small>
                    </span>
                    ) : null
                  }
                </div>
                <div className='text-center mt-5 mb-5'>
                  <ButtonComponent btnText={'Submit'}
                                   isFullWidth={false}
                                   elementStyle={'submit-btn'}
                                   disabled={isDisabled()}
                                   onClickFn={onSubmit}/>
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default PlayComponent
