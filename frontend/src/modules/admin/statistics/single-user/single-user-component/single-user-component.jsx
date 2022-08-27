import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Card, CardBody} from 'reactstrap'
import axios from 'axios'
import {usersApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import ButtonComponent from '../../../../../components/button/button'
import './single-user-component.css'

const SingleUserComponent = props => {
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const [userId, setUserId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [level, setLevel] = useState('')
  const [total, setTotal] = useState('')

  const {
    id
  } = useParams()

  useEffect(() => {
    loadData().then(() => {
    })
  }, [])

  const loadData = async () => {
    setLoader(true)
    axios.get(`${usersApi}users/${id}`).then(res => {
      let data = res.data.user
      setUserId(data.userId)
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setEmail(data.email)
      setLevel(data.level)
      setTotal(data.total)
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  const onClick = async () => {
    props.history.push('/leaderboard')
  }

  return (
    <div className='quiz-wrapper'>
      {
        loader ? (
          <Loader/>
        ) : null
      }
      <div>
        <div className='mb-4'>
          <ButtonComponent btnText={'Leaderboard'}
                           isFullWidth={false}
                           disabled={false}
                           onClickFn={onClick}/>
        </div>
        <div>
          <Card className='overflow-hidden'>
            <div className='quiz-header'>
              <div className='text-primary text-center p-4'>
                <h1 className='text-white font-size-20 text-uppercase'>
                  STUDENT - {userId}
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
              <div>
                Add Student Profile Here
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SingleUserComponent
