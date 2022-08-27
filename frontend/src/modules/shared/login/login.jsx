import React from 'react'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
import LoginForm from './login-form/login-form'
import './login.css'

const Login = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='container login-form'>
        <LoginForm history={props.history}/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Login
