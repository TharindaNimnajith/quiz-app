import React, {useState} from 'react'
import axios from 'axios'
import {Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {isEmpty, isValidCorrectAnswer, isValidQuizLevel} from '../../../../../helpers/common.helpers'
import {quizzesApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import ButtonComponent from '../../../../../components/button/button'
import TextField from '../../../../../components/text-field/text-field'
import './add-quiz-component.css'

const AddQuizComponent = props => {
  const [newQuestionModal, setNewQuestionModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const helperQuizTitle = 'Please enter a title for the quiz.'
  const helperQuizDescription = 'Please enter a description about the quiz.'
  const helperQuizLevel = 'Please enter the level (General/1A/1B/2A/2B/3A/3B).'
  const helperQuestion = 'Please enter the question.'
  const helperHints = 'Please enter hints.'
  const helperAnswer1 = 'Please enter answer 1.'
  const helperAnswer2 = 'Please enter answer 2.'
  const helperAnswer3 = 'Please enter answer 3.'
  const helperAnswer4 = 'Please enter answer 4.'
  const helperCorrectAnswer = 'Please enter the correct answer (1/2/3/4).'

  const [quizTitle, setQuizTitle] = useState('')
  const [quizDescription, setQuizDescription] = useState('')
  const [quizLevel, setQuizLevel] = useState('')
  const [question, setQuestion] = useState('')
  const [hints, setHints] = useState('')
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')
  const [answer3, setAnswer3] = useState('')
  const [answer4, setAnswer4] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [questions, setQuestions] = useState([])

  const [errorQuizTitle, setErrorQuizTitle] = useState('')
  const [errorQuizDescription, setErrorQuizDescription] = useState('')
  const [errorQuizLevel, setErrorQuizLevel] = useState('')
  const [errorQuestion, setErrorQuestion] = useState('')
  const [errorAnswer1, setErrorAnswer1] = useState('')
  const [errorAnswer2, setErrorAnswer2] = useState('')
  const [errorAnswer3, setErrorAnswer3] = useState('')
  const [errorAnswer4, setErrorAnswer4] = useState('')
  const [errorCorrectAnswer, setErrorCorrectAnswer] = useState('')

  const [quizTitleValid, setQuizTitleValid] = useState(false)
  const [quizDescriptionValid, setQuizDescriptionValid] = useState(false)
  const [quizLevelValid, setQuizLevelValid] = useState(false)
  const [questionValid, setQuestionValid] = useState(false)
  const [answer1Valid, setAnswer1Valid] = useState(false)
  const [answer2Valid, setAnswer2Valid] = useState(false)
  const [answer3Valid, setAnswer3Valid] = useState(false)
  const [answer4Valid, setAnswer4Valid] = useState(false)
  const [correctAnswerValid, setCorrectAnswerValid] = useState(false)

  const onChangeQuizTitle = async event => {
    setQuizTitle(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value);
    setQuizTitleValid(valid)
    setErrorQuizTitle('')
    if (!valid) {
      setErrorQuizTitle('Please enter a valid quiz title.')
    }
  }

  const onChangeQuizDescription = async event => {
    setQuizDescription(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setQuizDescriptionValid(valid)
    setErrorQuizDescription('')
    if (!valid) {
      setErrorQuizDescription('Please enter a valid quiz description.')
    }
  }

  const onChangeQuizLevel = async event => {
    setQuizLevel(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value) && await isValidQuizLevel(event.value)
    setQuizLevelValid(valid)
    setErrorQuizLevel('')
    if (!valid) {
      setErrorQuizLevel('Please enter the valid text for quiz level (General/1A/1B/2A/2B/3A/3B).')
    }
  }

  const onChangeQuestion = async event => {
    setQuestion(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setQuestionValid(valid)
    setErrorQuestion('')
    if (!valid) {
      setErrorQuestion('Please enter a valid question.')
    }
  }

  const onChangeHints = async event => {
    setHints(event.value)
  }

  const onChangeAnswer1 = async event => {
    setAnswer1(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setAnswer1Valid(valid)
    setErrorAnswer1('')
    if (!valid) {
      setErrorAnswer1('Please enter a valid answer.')
    }
  }

  const onChangeAnswer2 = async event => {
    setAnswer2(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setAnswer2Valid(valid)
    setErrorAnswer2('')
    if (!valid) {
      setErrorAnswer2('Please enter a valid answer.')
    }
  }

  const onChangeAnswer3 = async event => {
    setAnswer3(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setAnswer3Valid(valid)
    setErrorAnswer3('')
    if (!valid) {
      setErrorAnswer3('Please enter a valid answer.')
    }
  }

  const onChangeAnswer4 = async event => {
    setAnswer4(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setAnswer4Valid(valid)
    setErrorAnswer4('')
    if (!valid) {
      setErrorAnswer4('Please enter a valid answer.')
    }
  }

  const onChangeCorrectAnswer = async event => {
    setCorrectAnswer(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value) && await isValidCorrectAnswer(event.value)
    setCorrectAnswerValid(valid)
    setErrorCorrectAnswer('')
    if (!valid) {
      setErrorCorrectAnswer('Please enter the valid number for correct answer (1/2/3/4).')
    }
  }

  function isDisabled() {
    return !quizTitleValid || !quizDescriptionValid || !quizLevelValid || questions.length === 0
  }

  function isAddDisabled() {
    return !questionValid || !answer1Valid || !answer2Valid || !answer3Valid || !answer4Valid || !correctAnswerValid
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const toggleNewQuestionModal = async () => {
    setNewQuestionModal(!newQuestionModal)
  }

  const onClick = async () => {
    props.history.push('/content-management')
  }

  const onAdd = async () => {
    setQuestions([...questions, {
      'question': question,
      'hints': hints,
      'answer1': answer1,
      'answer2': answer2,
      'answer3': answer3,
      'answer4': answer4,
      'correctAnswer': correctAnswer
    }])
    setNewQuestionModal(!newQuestionModal)
  }

  const onSubmit = async () => {
    setError('')
    const data = {
      'quizTitle': quizTitle.trim(),
      'quizDescription': quizDescription.trim(),
      'quizLevel': quizLevel.trim(),
      'questions': questions
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

  const onAddNewQuestion = async () => {
    await reset()
    await toggleNewQuestionModal()
  }

  const reset = async () => {
    setQuestion('')
    setHints('')
    setAnswer1('')
    setAnswer2('')
    setAnswer3('')
    setAnswer4('')
    setCorrectAnswer('')
    setErrorQuestion('')
    setErrorAnswer1('')
    setErrorAnswer2('')
    setErrorAnswer3('')
    setErrorAnswer4('')
    setErrorCorrectAnswer('')
    setQuestionValid(false)
    setAnswer1Valid(false)
    setAnswer2Valid(false)
    setAnswer3Valid(false)
    setAnswer4Valid(false)
    setCorrectAnswerValid(false)
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
            <ButtonComponent btnText='Ok'
                             isFullWidth={false}
                             elementStyle='ok-button'
                             disabled={false}
                             onClickFn={onClick}/>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal isOpen={newQuestionModal}
               toggle={toggleNewQuestionModal}
               className='modal-close'>
          <ModalHeader toggle={toggleNewQuestionModal}
                       className='text-uppercase title'>
            New Question
          </ModalHeader>
          <ModalBody>
            <div>
              <TextField isRequired={true}
                         type='textarea'
                         labelText='Question'
                         name='question'
                         value={question}
                         errorText={errorQuestion}
                         helperText={helperQuestion}
                         maxLength={500}
                         onChangeFn={event => onChangeQuestion(event)}/>
            </div>
            <div>
              <TextField isRequired={false}
                         type='textarea'
                         labelText='Hints'
                         name='hints'
                         value={hints}
                         helperText={helperHints}
                         maxLength={500}
                         onChangeFn={event => onChangeHints(event)}/>
            </div>
            <div>
              <TextField isRequired={true}
                         type='textarea'
                         labelText='Answer 1'
                         name='answer1'
                         value={answer1}
                         errorText={errorAnswer1}
                         helperText={helperAnswer1}
                         maxLength={500}
                         onChangeFn={event => onChangeAnswer1(event)}/>
            </div>
            <div>
              <TextField isRequired={true}
                         type='textarea'
                         labelText='Answer 2'
                         name='answer2'
                         value={answer2}
                         errorText={errorAnswer2}
                         helperText={helperAnswer2}
                         maxLength={500}
                         onChangeFn={event => onChangeAnswer2(event)}/>
            </div>
            <div>
              <TextField isRequired={true}
                         type='textarea'
                         labelText='Answer 3'
                         name='answer3'
                         value={answer3}
                         errorText={errorAnswer3}
                         helperText={helperAnswer3}
                         maxLength={500}
                         onChangeFn={event => onChangeAnswer3(event)}/>
            </div>
            <div>
              <TextField isRequired={true}
                         type='textarea'
                         labelText='Answer 4'
                         name='answer4'
                         value={answer4}
                         errorText={errorAnswer4}
                         helperText={helperAnswer4}
                         maxLength={500}
                         onChangeFn={event => onChangeAnswer4(event)}/>
            </div>
            <div>
              <TextField isRequired={true}
                         labelText='Correct Answer (1/2/3/4)'
                         name='correctAnswer'
                         value={correctAnswer}
                         errorText={errorCorrectAnswer}
                         helperText={helperCorrectAnswer}
                         maxLength={1}
                         onChangeFn={event => onChangeCorrectAnswer(event)}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <ButtonComponent btnText='Add'
                             isFullWidth={false}
                             elementStyle='ok-button'
                             disabled={isAddDisabled()}
                             onClickFn={onAdd}/>
          </ModalFooter>
        </Modal>
      </div>
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
                             labelText='Quiz Title'
                             name='quizTitle'
                             value={quizTitle}
                             errorText={errorQuizTitle}
                             helperText={helperQuizTitle}
                             maxLength={200}
                             onChangeFn={event => onChangeQuizTitle(event)}/>
                </div>
                <div>
                  <TextField isRequired={true}
                             type='textarea'
                             labelText='Quiz Description'
                             name='quizDescription'
                             value={quizDescription}
                             errorText={errorQuizDescription}
                             helperText={helperQuizDescription}
                             maxLength={500}
                             onChangeFn={event => onChangeQuizDescription(event)}/>
                </div>
                <div>
                  <TextField isRequired={true}
                             labelText='Quiz Level (General/1A/1B/2A/2B/3A/3B)'
                             name='quizLevel'
                             value={quizLevel}
                             errorText={errorQuizLevel}
                             helperText={helperQuizLevel}
                             maxLength={7}
                             onChangeFn={event => onChangeQuizLevel(event)}/>
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
                <div className='text-center mt-5'>
                  <ButtonComponent btnText='Add New Question'
                                   isFullWidth={false}
                                   elementStyle='submit-btn'
                                   disabled={false}
                                   onClickFn={onAddNewQuestion}/>
                </div>
                <div className='text-center mt-5 mb-3'>
                  <ButtonComponent btnText='Submit'
                                   isFullWidth={false}
                                   elementStyle='submit-btn'
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
