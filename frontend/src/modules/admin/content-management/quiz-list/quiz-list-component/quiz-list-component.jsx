import React, {useEffect, useState} from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  CardGroup,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'
import axios from 'axios'
import {quizzesApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import ButtonComponent from '../../../../../components/button/button'
import './quiz-list-component.css'

const QuizListComponent = props => {
  const [successModal, setSuccessModal] = useState(false)
  const [modal, setModal] = useState(false)

  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [data, setData] = useState(null)
  const [deleteId, setDeleteId] = useState('')

  useEffect(() => {
    loadData().then(() => {
    })
  }, [])

  const loadData = async () => {
    setLoader(true)
    axios.get(`${quizzesApi}quizzes`).then(res => {
      setData(res.data.quizList)
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  const onDelete = async id => {
    setError('')
    setDeleteId(id)
    await toggle()
  }

  const onView = async id => {
    props.history.push('/single-quiz/' + id)
  }

  const onNewQuiz = async () => {
    props.history.push('/add-quiz')
  }

  const toggle = async () => {
    setModal(!modal)
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const confirmDelete = async () => {
    setError('')
    setLoader(true)
    axios.delete(`${quizzesApi}quizzes/${deleteId}`).then(res => {
      if (res.data.status === 200) {
        setData(data.filter(item => item._id !== deleteId))
        setMessage(res.data.message)
        toggle()
        toggleSuccessModal()
      } else {
        toggle()
        setError('An unexpected error occurred. Please try again later.')
        console.error(error)
      }
      setLoader(false)
    }).catch(error => {
      toggle()
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  return (
    <div>
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
                             onClickFn={toggleSuccessModal}/>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal isOpen={modal}
               toggle={toggle}
               className='modal-close'>
          <ModalHeader toggle={toggle}
                       className='text-uppercase'>
            Delete Quiz
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete this quiz?
          </ModalBody>
          <ModalFooter>
            <ButtonComponent btnText='Yes'
                             isFullWidth={false}
                             elementStyle='yes-button'
                             disabled={false}
                             onClickFn={confirmDelete}/>
            <ButtonComponent btnText='No'
                             isFullWidth={false}
                             elementStyle='no-button'
                             disabled={false}
                             onClickFn={toggle}/>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <small>
          {
            error ? (
              <span className='error'>
                {error}
              </span>
            ) : null
          }
        </small>
      </div>
      <div className='my-3 mx-4'>
        <ButtonComponent btnText='New Quiz'
                         isFullWidth={false}
                         disabled={false}
                         onClickFn={onNewQuiz}/>
      </div>
      <div>
        <CardGroup>
          {
            data && data.map((item, index) => {
              return (
                <div key={index}
                     className='card-width'>
                  <Card title='View Quiz'
                        className='m-4'>
                    <CardBody onClick={() => onView(item._id)}>
                      <CardTitle className='text-uppercase text-center m-4'
                                 tag='h2'>
                        <label>
                          {item.quizTitle}
                        </label>
                      </CardTitle>
                      <CardText className='m-4 text-center'>
                        <label>
                          Lesson: {item.lesson}
                        </label>
                      </CardText>
                      <CardText className='m-4 text-center'>
                        <label>
                          Level: {item.quizLevel}
                        </label>
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      <div className='text-center m-2'>
                        <i className='fas fa-trash-alt delete'
                           title='Delete Quiz'
                           onClick={() => onDelete(item._id)}/>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              )
            })
          }
        </CardGroup>
      </div>
    </div>
  )
}

export default QuizListComponent
