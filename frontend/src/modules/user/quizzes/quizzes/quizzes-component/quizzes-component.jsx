import React, {useEffect, useState} from 'react'
import {Card, CardBody, CardDeck, CardFooter, CardText, CardTitle} from 'reactstrap'
import axios from 'axios'
import {quizzesApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import './quizzes-component.css'

const QuizzesComponent = props => {
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

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

  const onView = async id => {
    props.history.push('/play/' + id)
  }

  return (
    <div>
      {
        loader ? (
          <Loader/>
        ) : null
      }
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
      <div>
        <CardDeck className='card-deck'>
          <div>
            {
              data && data.map(item => {
                return (
                  <div>
                    <Card key={item._id}
                          title='Try Now!'
                          className='m-4 card-item justify-content-center'
                          onClick={() => onView(item._id)}>
                      <CardBody>
                        <CardTitle className='text-uppercase text-center m-4'
                                   tag='h2'>
                          <label>
                            {item.quizTitle}
                          </label>
                        </CardTitle>
                        <CardText className='m-4 text-center'>
                          <label>
                            {item.quizDescription}
                          </label>
                        </CardText>
                      </CardBody>
                      <CardFooter className='text-center text-uppercase text-primary'>
                        <label>Try Now!</label>
                      </CardFooter>
                    </Card>
                  </div>
                )
              })
            }
          </div>
        </CardDeck>
      </div>
    </div>
  )
}

export default QuizzesComponent
