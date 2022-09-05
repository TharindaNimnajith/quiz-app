import React, {useEffect, useState} from 'react'
import {Table} from 'reactstrap'
import axios from 'axios'
import {usersApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import './leaderboard-component.css'

const LeaderboardComponent = props => {
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData().then(() => {
    })
  }, [])

  const loadData = async () => {
    setLoader(true)
    axios.get(`${usersApi}users`).then(res => {
      setData(res.data.userList.filter(user => user.userType === 'User').sort((a, b) => b.total - a.total))
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  const onView = async id => {
    props.history.push('/single-user/' + id)
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
        <Table bordered>
          <thead>
          <tr className='text-center'>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Total</th>
            <th>Rank</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            data && data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className='text-center'>
                    {item.userId}
                  </td>
                  <td>
                    {item.firstName}
                  </td>
                  <td>
                    {item.lastName}
                  </td>
                  <td>
                    {item.email}
                  </td>
                  <td align='right'>
                    {item.total}
                  </td>
                  <td align='right'>
                    {index + 1}
                  </td>
                  <td className='text-center'>
                    <i className='fa-solid fa-eye view'
                       title='View Student'
                       onClick={() => onView(item._id)}/>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default LeaderboardComponent
