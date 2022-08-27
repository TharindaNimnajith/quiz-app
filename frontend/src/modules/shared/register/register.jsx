import React from 'react'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
import RegisterForm from './register-form/register-form'
import './register.css'

const Register = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='container register-form'>
        <RegisterForm history={props.history}/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Register
