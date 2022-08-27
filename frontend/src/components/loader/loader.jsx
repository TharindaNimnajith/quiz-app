import React from 'react'
import {Spinner} from 'reactstrap'
import './loader.css'

const Loader = () => {
  return (
    <div className='preloader'>
      <div className='status'>
        <Spinner color='primary'/>
      </div>
    </div>
  )
}

export default Loader
