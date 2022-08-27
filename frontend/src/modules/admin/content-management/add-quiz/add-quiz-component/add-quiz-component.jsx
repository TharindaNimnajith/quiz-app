import React, {useState} from 'react'
import axios from 'axios'
import {Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {isEmpty} from '../../../../../helpers/common.helpers'
import {quizzesApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import ButtonComponent from '../../../../../components/button/button'
import TextField from '../../../../../components/text-field/text-field'
import './add-quiz-component.css'

const AddQuizComponent = props => {
  const [successModal, setSuccessModal] = useState(false)
  const [message, setMessage] = useState('')

  const helperQuizTitle = 'Please enter a title for the quiz.'
  const helperQuizDescription = 'Please enter a description about the quiz.'
  const helperAnswer1 = 'Please enter the answer for question 1.'
  const helperAnswer2 = 'Please enter the answer for question 2.'
  const helperAnswer3 = 'Please enter the answer for question 3.'
  const helperQuestion1 = 'Please enter question 1.'
  const helperQuestion2 = 'Please enter question 2.'
  const helperQuestion3 = 'Please enter question 3.'

  const [loader, setLoader] = useState(false)

  const [quizTitle, setQuizTitle] = useState('')
  const [quizDescription, setQuizDescription] = useState('')
  const [question1, setQuestion1] = useState('')
  const [answer1, setAnswer1] = useState('')
  const [question2, setQuestion2] = useState('')
  const [answer2, setAnswer2] = useState('')
  const [question3, setQuestion3] = useState('')
  const [answer3, setAnswer3] = useState('')

  const [errorQuizTitle, setErrorQuizTitle] = useState('')
  const [errorQuizDescription, setErrorQuizDescription] = useState('')
  const [errorQuestion1, setErrorQuestion1] = useState('')
  const [errorAnswer1, setErrorAnswer1] = useState('')
  const [errorQuestion2, setErrorQuestion2] = useState('')
  const [errorAnswer2, setErrorAnswer2] = useState('')
  const [errorQuestion3, setErrorQuestion3] = useState('')
  const [errorAnswer3, setErrorAnswer3] = useState('')

  const [quizTitleValid, setQuizTitleValid] = useState(false)
  const [quizDescriptionValid, setQuizDescriptionValid] = useState(false)
  const [question1Valid, setQuestion1Valid] = useState(false)
  const [answer1Valid, setAnswer1Valid] = useState(false)
  const [question2Valid, setQuestion2Valid] = useState(false)
  const [answer2Valid, setAnswer2Valid] = useState(false)
  const [question3Valid, setQuestion3Valid] = useState(false)
  const [answer3Valid, setAnswer3Valid] = useState(false)

  const [error, setError] = useState('')

  const onChangeQuizTitle = async event => {
    setQuizTitle(event.value)
    setQuizTitleValid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorQuizTitle('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorQuizTitle('Please enter a valid quiz title.')
    }
  }

  const onChangeQuizDescription = async event => {
    setQuizDescription(event.value)
    setQuizDescriptionValid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorQuizDescription('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorQuizDescription('Please enter a valid quiz description.')
    }
  }

  const onChangeQuestion1 = async event => {
    setQuestion1(event.value)
    setQuestion1Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorQuestion1('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorQuestion1('Please enter a valid question.')
    }
  }

  const onChangeQuestion2 = async event => {
    setQuestion2(event.value)
    setQuestion2Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorQuestion2('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorQuestion2('Please enter a valid question.')
    }
  }

  const onChangeQuestion3 = async event => {
    setQuestion3(event.value)
    setQuestion3Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorQuestion3('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorQuestion3('Please enter a valid question.')
    }
  }

  const onChangeAnswer1 = async event => {
    setAnswer1(event.value)
    setAnswer1Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorAnswer1('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorAnswer1('Please enter a valid answer.')
    }
  }

  const onChangeAnswer2 = async event => {
    setAnswer2(event.value)
    setAnswer2Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorAnswer2('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorAnswer2('Please enter a valid answer.')
    }
  }

  const onChangeAnswer3 = async event => {
    setAnswer3(event.value)
    setAnswer3Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorAnswer3('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorAnswer3('Please enter a valid answer.')
    }
  }

  function isDisabled() {
    return !quizTitleValid || !quizDescriptionValid || !question1Valid || !question2Valid || !question3Valid ||
      !answer1Valid || !answer2Valid || !answer3Valid
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const onClick = async () => {
    props.history.push('/content-management')
  }

  const onSubmit = async () => {
    setError('')
    const data = {
      'quizTitle': quizTitle.trim(),
      'quizDescription': quizDescription.trim(),
      'questions': [
        {
          question: question1.trim(),
          answer: answer1.trim()
        },
        {
          question: question2.trim(),
          answer: answer2.trim()
        },
        {
          question: question3.trim(),
          answer: answer3.trim()
        }
      ]
    }
    setLoader(true)
    axios.post(`${quizzesApi}quizzes`, data).then(res => {
      if (res.data.status === 201) {
        setLoader(false)
        setMessage(res.data.message)
        toggleSuccessModal()
      } else if (res.data.status === 409) {
        setError(res.data.message)
      }
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  return (
    <div className='quiz-wrapper'>
      {
        loader ? (
          <Loader/>
        ) : null
      }
      <div>
        <Modal isOpen={successModal}
               toggle={toggleSuccessModal}
               className='modal-close'>
          <ModalHeader toggle={toggleSuccessModal}
                       className='text-uppercase title'>
            Success!
          </ModalHeader>
          <ModalBody>
            {message}
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
        <div className='mb-4'>
          <ButtonComponent btnText={'Quiz List'}
                           isFullWidth={false}
                           disabled={false}
                           onClickFn={onClick}/>
        </div>
        <div>
          <Card className='overflow-hidden'>
            <div className='quiz-header'>
              <div className='text-primary text-center p-4'>
                <h1 className='text-white font-size-20 text-uppercase'>
                  New Quiz
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
                  <TextField isRequired={true}
                             labelText={'Quiz Title'}
                             name={'quizTitle'}
                             value={quizTitle}
                             errorText={errorQuizTitle}
                             helperText={helperQuizTitle}
                             maxLength={50}
                             onChangeFn={event => onChangeQuizTitle(event)}/>
                </div>
                <div>
                  <TextField isRequired={true}
                             labelText={'Quiz Description'}
                             name={'quizDescription'}
                             value={quizDescription}
                             errorText={errorQuizDescription}
                             helperText={helperQuizDescription}
                             maxLength={200}
                             onChangeFn={event => onChangeQuizDescription(event)}/>
                </div>
                <div>
                  <TextField isRequired={true}
                             labelText={'Question 1'}
                             name={'question1'}
                             value={question1}
                             errorText={errorQuestion1}
                             helperText={helperQuestion1}
                             maxLength={200}
                             onChangeFn={event => onChangeQuestion1(event)}/>
                </div>
                <div>
                  <TextField isRequired={true}
                             labelText={'Answer for Question 1'}
                             name={'answer1'}
                             value={answer1}
                             errorText={errorAnswer1}
                             helperText={helperAnswer1}
                             maxLength={50}
                             onChangeFn={event => onChangeAnswer1(event)}/>
                </div>
                <div>
                  <TextField isRequired={true}
                             labelText={'Question 2'}
                             name={'question2'}
                             value={question2}
                             errorText={errorQuestion2}
                             helperText={helperQuestion2}
                             maxLength={200}
                             onChangeFn={event => onChangeQuestion2(event)}/>
                </div>
                <div>
                  <TextField isRequired={true}
                             labelText={'Answer for Question 2'}
                             name={'answer2'}
                             value={answer2}
                             errorText={errorAnswer2}
                             helperText={helperAnswer2}
                             maxLength={50}
                             onChangeFn={event => onChangeAnswer2(event)}/>
                </div>
                <div>
                  <TextField isRequired={true}
                             labelText={'Question 3'}
                             name={'question3'}
                             value={question3}
                             errorText={errorQuestion3}
                             helperText={helperQuestion3}
                             maxLength={200}
                             onChangeFn={event => onChangeQuestion3(event)}/>
                </div>
                <div>
                  <TextField isRequired={true}
                             labelText={'Answer for Question 3'}
                             name={'answer3'}
                             value={answer3}
                             errorText={errorAnswer3}
                             helperText={helperAnswer3}
                             maxLength={50}
                             onChangeFn={event => onChangeAnswer3(event)}/>
                </div>
                <div className='text-center mt-4 mb-3'>
                  <ButtonComponent btnText={'Submit'}
                                   isFullWidth={false}
                                   elementStyle={'submit-btn'}
                                   disabled={isDisabled()}
                                   onClickFn={onSubmit}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddQuizComponent
