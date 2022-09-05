import React, {useEffect, useState} from 'react'
import {Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import axios from 'axios'
import {isEmpty, isValidLesson} from '../../../helpers/common.helpers'
import {settingsApi} from '../../../config/api.config'
import Header from '../../../components/header/header'
import TextField from '../../../components/text-field/text-field'
import ButtonComponent from '../../../components/button/button'
import Loader from '../../../components/loader/loader'
import './settings.css'

const Settings = () => {
  const [successModal, setSuccessModal] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const helperValue = 'Please enter the lesson (1/2/3/4).'
  const [value, setValue] = useState('')
  const [errorValue, setErrorValue] = useState('')
  const [valueValid, setValueValid] = useState(false)

  useEffect(() => {
    loadData().then(() => {
    })
  }, [])

  const loadData = async () => {
    setLoader(true)
    axios.get(`${settingsApi}settings/Lesson`).then(res => {
      setValue(res.data.setting.value)
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  const onChangeValue = async event => {
    setValue(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value) && await isValidLesson(event.value)
    setValueValid(valid)
    setErrorValue('')
    if (!valid) {
      setErrorValue('Please enter a valid lesson (1/2/3/4).')
    }
  }

  function isDisabled() {
    return !valueValid
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const onSubmit = async () => {
    setError('')
    const data = {
      'key': 'Lesson',
      'value': value
    }
    setLoader(true)
    axios.put(`${settingsApi}settings`, data).then(res => {
      if (res.data.status === 200) {
        setLoader(false)
        setMessage(res.data.message)
        toggleSuccessModal()
      }
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  return (
    <div>
      <div>
        <Header/>
      </div>
      <h1 className='text-center text-uppercase mt-5 page-title'>
        Settings
      </h1>
      <div className='container settings-page'>
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
        <div className='settings-wrapper'>
          {
            loader ? (
              <Loader/>
            ) : null
          }
          <div>
            <Card className='overflow-hidden'>
              <div className='quiz-header'>
                <div className='text-primary text-center p-4'>
                  <h1 className='text-white font-size-20 text-uppercase'>
                    Update Settings
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
                               labelText='Lesson'
                               name='lesson'
                               value={value}
                               errorText={errorValue}
                               helperText={helperValue}
                               maxLength={1}
                               onChangeFn={event => onChangeValue(event)}/>
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
    </div>
  )
}

export default Settings
