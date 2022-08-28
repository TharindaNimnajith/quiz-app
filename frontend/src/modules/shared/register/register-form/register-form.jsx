import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import axios from 'axios'
import {isEmpty} from '../../../../helpers/common.helpers'
import {usersApi} from '../../../../config/api.config'
import Loader from '../../../../components/loader/loader'
import TextField from '../../../../components/text-field/text-field'
import ButtonComponent from '../../../../components/button/button'
import './register-form.css'

const RegisterForm = props => {
  const [successModal, setSuccessModal] = useState(false)
  const [message, setMessage] = useState('')

  const helperFirstName = 'Please enter your first name.'
  const helperLastName = 'Please enter your last name.'
  const helperEmail = 'Please enter your email address.'
  const helperPassword = 'Please enter a password.'
  const helperConfirmPassword = 'Please enter the password again.'

  const [loader, setLoader] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorFirstName, setErrorFirstName] = useState('')
  const [errorLastName, setErrorLastName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('')

  const [firstNameValid, setFirstNameValid] = useState(false)
  const [lastNameValid, setLastNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)

  const [error, setError] = useState('')

  const onChangeFirstName = async event => {
    setFirstName(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setFirstNameValid(valid)
    setErrorFirstName('')
    if (!valid) {
      setErrorFirstName('Please enter a valid first name.')
    }
  }

  const onChangeLastName = async event => {
    setLastName(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setLastNameValid(valid)
    setErrorLastName('')
    if (!valid) {
      setErrorLastName('Please enter a valid last name.')
    }
  }

  const onChangeEmail = async event => {
    setEmail(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setEmailValid(valid)
    setErrorEmail('')
    setError('')
    if (!valid) {
      setErrorEmail('Please enter a valid email address.')
    }
  }

  const onChangePassword = async event => {
    setPassword(event.value)
    let valid = event.eventInfo.target.validity.valid && !await isEmpty(event.value)
    setPasswordValid(valid)
    setErrorPassword('')
    if (!valid) {
      setErrorPassword('Please enter a strong password with at least 4 characters.')
    }
  }

  const onChangeConfirmPassword = async event => {
    setConfirmPassword(event.value)
    let valid = event.value === password
    setConfirmPasswordValid(valid)
    setErrorConfirmPassword('')
    if (!valid) {
      setErrorConfirmPassword('Please make sure your passwords match.')
    }
  }

  function isDisabled() {
    return !firstNameValid || !lastNameValid || !emailValid || !passwordValid || !confirmPasswordValid
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const onClick = async () => {
    props.history.push('/login')
  }

  const onSubmit = async () => {
    setError('')
    const data = {
      'firstName': firstName.trim(),
      'lastName': lastName.trim(),
      'email': email.trim(),
      'password': password
    }
    setLoader(true)
    axios.post(`${usersApi}users`, data).then(res => {
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
    <div className='register-wrapper'>
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
        <Card className='overflow-hidden'>
          <div className='register-header'>
            <div className='text-primary text-center p-4'>
              <h1 className='text-white font-size-20 text-uppercase'>
                <i className='register-icon fas fa-user-plus mt-2'/>
                <span className='ms-3'>
                  Register
                </span>
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
                           labelText='First Name'
                           name='firstName'
                           value={firstName}
                           errorText={errorFirstName}
                           helperText={helperFirstName}
                           maxLength={50}
                           onChangeFn={event => onChangeFirstName(event)}/>
              </div>
              <div>
                <TextField isRequired={true}
                           labelText='Last Name'
                           name='lastName'
                           value={lastName}
                           errorText={errorLastName}
                           helperText={helperLastName}
                           maxLength={50}
                           onChangeFn={event => onChangeLastName(event)}/>
              </div>
              <div>
                <TextField isRequired={true}
                           labelText='Email'
                           type='email'
                           name='email'
                           value={email}
                           errorText={errorEmail}
                           helperText={helperEmail}
                           minLength={6}
                           maxLength={100}
                           onChangeFn={event => onChangeEmail(event)}/>
              </div>
              <div>
                <TextField isRequired={true}
                           labelText='Password'
                           type='password'
                           name='password'
                           value={password}
                           errorText={errorPassword}
                           helperText={helperPassword}
                           minLength={4}
                           maxLength={50}
                           onChangeFn={event => onChangePassword(event)}/>
              </div>
              <div>
                <TextField isRequired={true}
                           labelText='Confirm Password'
                           type='password'
                           name='confirmPassword'
                           value={confirmPassword}
                           errorText={errorConfirmPassword}
                           helperText={helperConfirmPassword}
                           disabled={!passwordValid}
                           minLength={4}
                           maxLength={50}
                           onChangeFn={event => onChangeConfirmPassword(event)}/>
              </div>
              <div className='text-center mt-4 mb-3'>
                <ButtonComponent btnText='Register'
                                 isFullWidth={false}
                                 elementStyle='register-btn'
                                 disabled={isDisabled()}
                                 onClickFn={onSubmit}/>
              </div>
            </div>
            <div className='ms-3'>
              <label>Already have an account?&nbsp;</label>
              <Link to='/login'>
                <label className='login-link'>
                  Login
                </label>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default RegisterForm
