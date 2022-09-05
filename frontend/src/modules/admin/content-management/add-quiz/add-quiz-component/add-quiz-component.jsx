// noinspection ES6CheckImport

import React, {useState} from 'react'
import axios from 'axios'
import {Card, CardBody, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {convertToRaw, EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import parse from 'html-react-parser'
import {quizzesApi} from '../../../../../config/api.config'
import {isEmpty, isValidCorrectAnswer, isValidLesson, isValidQuizLevel} from '../../../../../helpers/common.helpers'
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
  const helperLesson = 'Please enter the lesson (1/2/3/4).'
  const helperQuizLevel = 'Please enter the level (General/1A/1B/2A/2B/3A/3B).'
  const helperCorrectAnswer = 'Please enter the correct answer (1/2/3/4/5).'

  const [quizTitle, setQuizTitle] = useState('')
  const [lesson, setLesson] = useState('')
  const [quizLevel, setQuizLevel] = useState('')

  const [question, setQuestion] = useState(EditorState.createEmpty())
  const [hints, setHints] = useState(EditorState.createEmpty())
  const [answer1, setAnswer1] = useState(EditorState.createEmpty())
  const [answer2, setAnswer2] = useState(EditorState.createEmpty())
  const [answer3, setAnswer3] = useState(EditorState.createEmpty())
  const [answer4, setAnswer4] = useState(EditorState.createEmpty())
  const [answer5, setAnswer5] = useState(EditorState.createEmpty())
  const [correctAnswer, setCorrectAnswer] = useState('')

  const [questionHtml, setQuestionHtml] = useState('')
  const [hintsHtml, setHintsHtml] = useState('')
  const [answer1Html, setAnswer1Html] = useState('')
  const [answer2Html, setAnswer2Html] = useState('')
  const [answer3Html, setAnswer3Html] = useState('')
  const [answer4Html, setAnswer4Html] = useState('')
  const [answer5Html, setAnswer5Html] = useState('')

  const [questions, setQuestions] = useState([])

  const [errorQuizTitle, setErrorQuizTitle] = useState('')
  const [errorLesson, setErrorLesson] = useState('')
  const [errorQuizLevel, setErrorQuizLevel] = useState('')
  const [errorCorrectAnswer, setErrorCorrectAnswer] = useState('')

  const [quizTitleValid, setQuizTitleValid] = useState(false)
  const [lessonValid, setLessonValid] = useState(false)
  const [quizLevelValid, setQuizLevelValid] = useState(false)
  const [correctAnswerValid, setCorrectAnswerValid] = useState(false)

  const onChangeQuizTitle = async event => {
    setQuizTitle(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setQuizTitleValid(valid)
    setErrorQuizTitle('')
    if (!valid) {
      setErrorQuizTitle('Please enter a valid quiz title.')
    }
  }

  const onChangeLesson = async event => {
    setLesson(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value) && await isValidLesson(event.value)
    setLessonValid(valid)
    setErrorLesson('')
    if (!valid) {
      setErrorLesson('Please enter a valid lesson (1/2/3/4).')
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
    setQuestion(event)
    setQuestionHtml(draftToHtml(convertToRaw(event.getCurrentContent())))
  }

  const onChangeHints = async event => {
    setHints(event)
    setHintsHtml(draftToHtml(convertToRaw(event.getCurrentContent())))
  }

  const onChangeAnswer1 = async event => {
    setAnswer1(event)
    setAnswer1Html(draftToHtml(convertToRaw(event.getCurrentContent())))
  }

  const onChangeAnswer2 = async event => {
    setAnswer2(event)
    setAnswer2Html(draftToHtml(convertToRaw(event.getCurrentContent())))
  }

  const onChangeAnswer3 = async event => {
    setAnswer3(event)
    setAnswer3Html(draftToHtml(convertToRaw(event.getCurrentContent())))
  }

  const onChangeAnswer4 = async event => {
    setAnswer4(event)
    setAnswer4Html(draftToHtml(convertToRaw(event.getCurrentContent())))
  }

  const onChangeAnswer5 = async event => {
    setAnswer5(event)
    setAnswer5Html(draftToHtml(convertToRaw(event.getCurrentContent())))
  }

  const onChangeCorrectAnswer = async event => {
    setCorrectAnswer(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value) && await isValidCorrectAnswer(event.value)
    setCorrectAnswerValid(valid)
    setErrorCorrectAnswer('')
    if (!valid) {
      setErrorCorrectAnswer('Please enter the valid number for correct answer (1/2/3/4/5).')
    }
  }

  function isDisabled() {
    return !quizTitleValid || !lessonValid || !quizLevelValid || questions.length === 0
  }

  function isAddDisabled() {
    return !correctAnswerValid
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
      'question': questionHtml,
      'hints': hintsHtml,
      'answer1': answer1Html,
      'answer2': answer2Html,
      'answer3': answer3Html,
      'answer4': answer4Html,
      'answer5': answer5Html,
      'correctAnswer': correctAnswer
    }])
    setNewQuestionModal(!newQuestionModal)
  }

  const onSubmit = async () => {
    setError('')
    const data = {
      'quizTitle': quizTitle.trim(),
      'lesson': lesson,
      'quizLevel': quizLevel,
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
    setQuestion(EditorState.createEmpty())
    setHints(EditorState.createEmpty())
    setAnswer1(EditorState.createEmpty())
    setAnswer2(EditorState.createEmpty())
    setAnswer3(EditorState.createEmpty())
    setAnswer4(EditorState.createEmpty())
    setAnswer5(EditorState.createEmpty())
    setQuestionHtml('')
    setHintsHtml('')
    setAnswer1Html('')
    setAnswer2Html('')
    setAnswer3Html('')
    setAnswer4Html('')
    setAnswer5Html('')
    setCorrectAnswer('')
    setErrorCorrectAnswer('')
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
               className='modal-close'
               fullscreen={true}>
          <ModalHeader toggle={toggleNewQuestionModal}
                       className='text-uppercase title'>
            New Question
          </ModalHeader>
          <ModalBody>
            <div>
              <Label className='mb-1 mt-2'>
                Question
                <span className='error'>
                  &nbsp;*
                </span>
              </Label>
              <Editor editorState={question}
                      wrapperClassName='demo-wrapper'
                      editorClassName='demo-editor'
                      onEditorStateChange={onChangeQuestion}/>
            </div>
            <div>
              <Label className='mb-1 mt-2'>
                Hints
              </Label>
              <Editor editorState={hints}
                      wrapperClassName='demo-wrapper'
                      editorClassName='demo-editor'
                      onEditorStateChange={onChangeHints}/>
            </div>
            <div>
              <Label className='mb-1 mt-2'>
                Answer 1
                <span className='error'>
                  &nbsp;*
                </span>
              </Label>
              <Editor editorState={answer1}
                      wrapperClassName='demo-wrapper-answer'
                      editorClassName='demo-editor-answer'
                      onEditorStateChange={onChangeAnswer1}/>
            </div>
            <div>
              <Label className='mb-1 mt-2'>
                Answer 2
                <span className='error'>
                  &nbsp;*
                </span>
              </Label>
              <Editor editorState={answer2}
                      wrapperClassName='demo-wrapper-answer'
                      editorClassName='demo-editor-answer'
                      onEditorStateChange={onChangeAnswer2}/>
            </div>
            <div>
              <Label className='mb-1 mt-2'>
                Answer 3
                <span className='error'>
                  &nbsp;*
                </span>
              </Label>
              <Editor editorState={answer3}
                      wrapperClassName='demo-wrapper-answer'
                      editorClassName='demo-editor-answer'
                      onEditorStateChange={onChangeAnswer3}/>
            </div>
            <div>
              <Label className='mb-1 mt-2'>
                Answer 4
                <span className='error'>
                  &nbsp;*
                </span>
              </Label>
              <Editor editorState={answer4}
                      wrapperClassName='demo-wrapper-answer'
                      editorClassName='demo-editor-answer'
                      onEditorStateChange={onChangeAnswer4}/>
            </div>
            <div>
              <Label className='mb-1 mt-2'>
                Answer 5
                <span className='error'>
                  &nbsp;*
                </span>
              </Label>
              <Editor editorState={answer5}
                      wrapperClassName='demo-wrapper-answer'
                      editorClassName='demo-editor-answer'
                      onEditorStateChange={onChangeAnswer5}/>
            </div>
            <div>
              <TextField isRequired={true}
                         labelText='Correct Answer (1/2/3/4/5)'
                         name='correctAnswer'
                         value={correctAnswer}
                         errorText={errorCorrectAnswer}
                         helperText={helperCorrectAnswer}
                         maxLength={1}
                         onChangeFn={event => onChangeCorrectAnswer(event)}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='row'>
              <div className='col-sm'>
                <ButtonComponent btnText='Cancel'
                                 isFullWidth={false}
                                 elementStyle='ok-button'
                                 disabled={false}
                                 onClickFn={toggleNewQuestionModal}/>
              </div>
              <div className='col-sm'>
                <ButtonComponent btnText='Add'
                                 isFullWidth={false}
                                 elementStyle='ok-button'
                                 disabled={isAddDisabled()}
                                 onClickFn={onAdd}/>
              </div>
            </div>
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
                             labelText='Lesson (1/2/3/4)'
                             name='lesson'
                             value={lesson}
                             errorText={errorLesson}
                             helperText={helperLesson}
                             maxLength={1}
                             onChangeFn={event => onChangeLesson(event)}/>
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
