import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Card, CardBody, Table} from 'reactstrap'
import axios from 'axios'
import {CSVLink} from 'react-csv'
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
  const [total, setTotal] = useState('')

  const [levels, setLevels] = useState([])
  const [results, setResults] = useState([])
  const [csvData, setCsvData] = useState([])

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
      setTotal(data.total)
      setLevels(data.levels)
      setResults(data.results)
      let csvDataTemp = []
      for (let item of data.results) {
        csvDataTemp.push({
          lesson: item.lesson,
          level: item.quizLevel,
          question: item.question,
          studentAnswer: item.studentAnswer,
          correctAnswer: item.correctAnswer,
          isCorrect: item.studentAnswer === item.correctAnswer ? 'Correct' : 'Incorrect'
        })
      }
      setCsvData(csvDataTemp)
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

  const headers = [{
    label: 'Lesson',
    key: 'lesson'
  }, {
    label: 'Level',
    key: 'level'
  }, {
    label: 'Question',
    key: 'question'
  }, {
    label: 'Student Answer',
    key: 'studentAnswer'
  }, {
    label: 'Correct Answer',
    key: 'correctAnswer'
  }, {
    label: 'Is Correct',
    key: 'isCorrect'
  }]

  const csvReport = {
    data: csvData,
    headers: headers,
    filename: userId + '_' + firstName + '_' + lastName + '.csv'
  }

  return (
    <div className='user-wrapper'>
      {
        loader ? (
          <Loader/>
        ) : null
      }
      <div>
        <div className='mb-4'>
          <ButtonComponent btnText='Leaderboard'
                           isFullWidth={false}
                           disabled={false}
                           onClickFn={onClick}/>
        </div>
        <div>
          <Card className='overflow-hidden'>
            <div className='user-header'>
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
                <label className='my-1'>First Name: {firstName}</label>
                <br/>
                <label className='my-1'>Last Name: {lastName}</label>
                <br/>
                <label className='my-1'>Email: {email}</label>
                <br/>
                <label className='my-1'>Total: {total}</label>
                <br/>
              </div>
              <div className='mt-4 mb-5'>
                <Table bordered>
                  <thead>
                  <tr className='text-center'>
                    <th>Lesson</th>
                    <th>Level</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    levels && levels.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className='text-center'>
                            {item.lesson}
                          </td>
                          <td className='text-center'>
                            {item.level}
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
              </div>
              <div>
                <h4 className='text-center my-3'>
                  Results
                </h4>
                <div className='my-3'>
                  <CSVLink {...csvReport}>
                    Export to CSV
                  </CSVLink>
                </div>
                <Table bordered>
                  <thead>
                  <tr className='text-center'>
                    <th>Lesson</th>
                    <th>Level</th>
                    <th>Question</th>
                    <th>Student Answer</th>
                    <th>Correct Answer</th>
                    <th>Is Correct</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    results && results.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className='text-center'>
                            {item.lesson}
                          </td>
                          <td className='text-center'>
                            {item.quizLevel}
                          </td>
                          <td className='text-center'>
                            {item.question}
                          </td>
                          <td className='text-center'>
                            {item.studentAnswer}
                          </td>
                          <td className='text-center'>
                            {item.correctAnswer}
                          </td>
                          <td className='text-center'>
                            {
                              item.studentAnswer === item.correctAnswer ? (
                                <span className='text-success'>
                                  Correct
                                </span>
                              ) : (
                                <span className='text-danger'>
                                  Incorrect
                                </span>
                              )
                            }
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SingleUserComponent
