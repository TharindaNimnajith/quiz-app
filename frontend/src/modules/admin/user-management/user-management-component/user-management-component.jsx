import React, {useEffect, useState} from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap'
import axios from 'axios'
import {usersApi} from '../../../../config/api.config'
import Loader from '../../../../components/loader/loader'
import ButtonComponent from '../../../../components/button/button'
import './user-management-component.css'

const UserManagementComponent = () => {
  const [successModal, setSuccessModal] = useState(false)
  const [modal, setModal] = useState(false)

  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [deleteId, setDeleteId] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    loadData().then(() => {
    })
  }, [])

  const loadData = async () => {
    setLoader(true)
    axios.get(`${usersApi}users`).then(res => {
      setData(res.data.userList.sort((a, b) => a.userId - b.userId))
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  const onDelete = async id => {
    setError('')
    setDeleteId(id)
    await toggle()
  }

  const toggle = async () => {
    setModal(!modal)
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const confirmDelete = async () => {
    setError('')
    setLoader(true)
    axios.delete(`${usersApi}users/${deleteId}`).then(res => {
      if (res.data.status === 200) {
        setData(data.filter(item => item._id !== deleteId))
        setMessage(res.data.message)
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
            Delete User
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete this user?
          </ModalBody>
          <ModalFooter>
            <ButtonComponent btnText='Yes'
                             isFullWidth={false}
                             elementStyle='yes-button'
                             disabled={false}
                             onClickFn={confirmDelete}/>
            <ButtonComponent btnText='No'
                             isFullWidth={false}
                             elementStyle='no-button'
                             disabled={false}
                             onClickFn={toggle}/>
          </ModalFooter>
        </Modal>
      </div>
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
            <th>User Type</th>
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
                  <td className='text-center'>
                    {
                      item.userType === 'Admin' ? (
                        <span className='text-danger'>
                          Teacher
                        </span>
                      ) : (
                        <span className='text-primary'>
                          Student
                        </span>
                      )
                    }
                  </td>
                  <td className='text-center'>
                    {
                      item.userType === 'User' ? (
                        <i className='fas fa-trash-alt delete'
                           title='Delete Student'
                           onClick={() => onDelete(item._id)}/>
                      ) : null
                    }
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

export default UserManagementComponent
