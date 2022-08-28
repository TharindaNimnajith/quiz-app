import React from 'react'
import {Input} from 'reactstrap'
import ButtonComponent from '../../../../components/button/button'
import './play-component.css'

const PlayComponent = props => {
  return (
    <div>
      <h1 className='text-center mt-4'>
        {props.data.quizLevel}
      </h1>
      {
        props.data.questions && props.data.questions.map((item, index) => {
          return (
            <div className='mt-5'
                 key={item._id}>
              <div>
                {
                  index < 9 ? (
                    <label>0{index + 1}.&nbsp;</label>
                  ) : (
                    <label>{index + 1}.&nbsp;</label>
                  )
                }
                <label>{item.question}</label>
              </div>
              {
                item.hints && (
                  <div className='mx-4 mt-1'>
                    <label>Hint: {item.hints}</label>
                  </div>
                )
              }
              <div className='mx-4 mt-2'>
                <div className='mt-3'>
                  <Input type='radio'
                         name={index}/>
                  <label className='mx-2'>
                    1.&nbsp;{item.answer1}
                  </label>
                </div>
                <div className='mt-2'>
                  <Input type='radio'
                         name={index}/>
                  <label className='mx-2'>
                    2.&nbsp;{item.answer2}
                  </label>
                </div>
                <div className='mt-2'>
                  <Input type='radio'
                         name={index}/>
                  <label className='mx-2'>
                    3.&nbsp;{item.answer3}
                  </label>
                </div>
                <div className='mt-2'>
                  <Input type='radio'
                         name={index}/>
                  <label className='mx-2'>
                    4.&nbsp;{item.answer4}
                  </label>
                </div>
              </div>
              <div>

              </div>
            </div>
          )
        })
      }
      <div className='text-center mt-5 mb-3'>
        <ButtonComponent btnText='Submit'
                         isFullWidth={false}
                         elementStyle='submit-btn'
                         disabled={false}
                         onClickFn={() => null}/>
      </div>
    </div>
  )
}

export default PlayComponent
