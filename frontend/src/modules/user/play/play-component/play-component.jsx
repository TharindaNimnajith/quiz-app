import React, {useContext, useState} from 'react'
import {Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import axios from 'axios'
import {usersApi} from '../../../../config/api.config'
import {authStoreKey} from '../../../../config/main.config'
import {AppContext} from '../../../../global/app-context'
import {setLocalStorageItem} from '../../../../helpers/local-storage.helpers'
import Loader from '../../../../components/loader/loader'
import ButtonComponent from '../../../../components/button/button'
import './play-component.css'

const PlayComponent = props => {
  const appContext = useContext(AppContext)

  const [successModal, setSuccessModal] = useState(false)
  const [modal, setModal] = useState(false)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const [submitted, setSubmitted] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const studentAnswers = new Map([])

  const toggle = async () => {
    setError('')
    setModal(!modal)
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const next = async () => {
    window.location.reload()
  }

  const onChangeValue = async (index, event) => {
    studentAnswers.set(index, parseInt(event.target.value))
    if (studentAnswers.size === props.data.questions.length)
      setDisabled(false)
  }

  const confirmSubmit = async () => {
    setModal(!modal)
    setError('')
    setLoader(true)
    const data = {
      'level': 'Done',
      'total': 70,
      'results': []
    }
    axios.put(`${usersApi}users/${appContext.loginData._id}`, data).then(res => {
      if (res.data.status === 200) {
        setMessage(res.data.message)
        setSubmitted(true)
        appContext.login(res.data.user)
        setLocalStorageItem(authStoreKey, res.data.user)
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
            Submit Answers
          </ModalHeader>
          <ModalBody>
            Are you sure you want to submit your answers?
          </ModalBody>
          <ModalFooter>
            <ButtonComponent btnText='Yes'
                             isFullWidth={false}
                             elementStyle='yes-button'
                             disabled={false}
                             onClickFn={confirmSubmit}/>
            <ButtonComponent btnText='No'
                             isFullWidth={false}
                             elementStyle='no-button'
                             disabled={false}
                             onClickFn={toggle}/>
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
      </div>
      <h1 className='text-center mt-4'>
        {props.data.quizLevel}
      </h1>
      {
        props.data.questions && props.data.questions.map((item, index) => {
          return (
            <div className='mt-5'
                 key={item._id}>
              <div>
                {
                  index < 9 ? (
                    <label>0{index + 1}.&nbsp;</label>
                  ) : (
                    <label>{index + 1}.&nbsp;</label>
                  )
                }
                <label>
                  {item.question}
                </label>
                <span className='error'>
                  &nbsp;*
                </span>
              </div>
              {
                item.hints && (
                  <div className='mx-4 mt-1'>
                    <label>Hint: {item.hints}</label>
                  </div>
                )
              }
              <div className='mx-4 mt-2'>
                <div className='mt-3'>
                  <Input type='radio'
                         value={1}
                         name={index}
                         disabled={submitted}
                         onChange={event => onChangeValue(index, event)}/>
                  <label className='mx-2'>
                    1)&nbsp;{item.answer1}
                  </label>
                </div>
                <div className='mt-2'>
                  <Input type='radio'
                         value={2}
                         name={index}
                         disabled={submitted}
                         onChange={event => onChangeValue(index, event)}/>
                  <label className='mx-2'>
                    2)&nbsp;{item.answer2}
                  </label>
                </div>
                <div className='mt-2'>
                  <Input type='radio'
                         value={3}
                         name={index}
                         disabled={submitted}
                         onChange={event => onChangeValue(index, event)}/>
                  <label className='mx-2'>
                    3)&nbsp;{item.answer3}
                  </label>
                </div>
                <div className='mt-2'>
                  <Input type='radio'
                         value={4}
                         name={index}
                         disabled={submitted}
                         onChange={event => onChangeValue(index, event)}/>
                  <label className='mx-2'>
                    4)&nbsp;{item.answer4}
                  </label>
                </div>
              </div>
              {
                submitted && (
                  <div className='mx-4 mt-3'>
                    <label className='text-primary'>
                      Correct Answer = {item.correctAnswer}
                    </label>
                  </div>
                )
              }
            </div>
          )
        })
      }
      <div className='text-center mt-5 mb-3'>
        {
          submitted ? (
            <ButtonComponent btnText='Next'
                             isFullWidth={false}
                             elementStyle='submit-btn'
                             disabled={false}
                             onClickFn={next}/>
          ) : (
            <ButtonComponent btnText='Submit'
                             isFullWidth={false}
                             elementStyle='submit-btn'
                             disabled={disabled}
                             onClickFn={toggle}/>
          )
        }
      </div>
    </div>
  )
}

export default PlayComponent
