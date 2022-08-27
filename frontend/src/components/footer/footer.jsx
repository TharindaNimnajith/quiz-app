import React, {Fragment} from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <Fragment>
        <div className='text-center my-3'>
          <h6 className='mt-4 mb-4'>
            All Rights Reserved Copyright ©&nbsp;{new Date().getFullYear()}
          </h6>
        </div>
      </Fragment>
    </div>
  )
}

export default Footer
