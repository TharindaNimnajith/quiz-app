import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {quizzesApi} from '../../../config/api.config'
import {AppContext} from '../../../global/app-context'
import Header from '../../../components/header/header'
import Loader from '../../../components/loader/loader'
import FinalComponent from './final-component/final-component'
import PlayComponent from './play-component/play-component'
import './play.css'

const Play = props => {
  const appContext = useContext(AppContext)

  const [loader, setLoader] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    loadData().then(() => {
    })
  }, [])

  const loadData = async () => {
    if (appContext.loginData.level !== 'Done') {
      setLoader(true)
      axios.get(`${quizzesApi}quizzes/level/${appContext.loginData.level}`).then(res => {
        setData(res.data.quiz)
        setLoader(false)
      }).catch(error => {
        setError('An unexpected error occurred. Please try again later.')
        setLoader(false)
        console.error(error)
      })
    }
  }

  return (
    <div>
      <div>
        <Header/>
      </div>
      {
        loader ? (
          <Loader/>
        ) : null
      }
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
      {
        appContext.loginData.level === 'Done' ? (
          <div className='container'>
            <FinalComponent/>
          </div>
        ) : data && (
          <div className='container play-page'>
            <PlayComponent history={props.history}
                           data={data}/>
          </div>
        )
      }
    </div>
  )
}

export default Play
