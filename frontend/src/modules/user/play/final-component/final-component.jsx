import React, {useState} from 'react'
import Loader from '../../../../components/loader/loader'
import './final-component.css'

const FinalComponent = () => {
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState('')

  return (
    <div>
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
      <div>
        Play
      </div>
    </div>
  )
}

export default FinalComponent
