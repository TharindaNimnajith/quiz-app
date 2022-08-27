import React from 'react'
import {Button} from 'reactstrap'
import './button.css'

const emptyFn = async () => undefined

const ButtonComponent = (
  {
    elementWrapperStyle = '',
    elementStyle = '',
    btnText = '',
    btnName = '',
    btnColor = 'primary',
    btnSize = 'md',
    isOutline = false,
    isFullWidth = false,
    disabled = false,
    onClickFn = emptyFn
  }
) => {
  return (
    <div className={elementWrapperStyle}>
      <Button className={`${elementStyle} button-custom text-uppercase`}
              color={btnColor}
              size={btnSize}
              block={isFullWidth}
              outline={isOutline}
              name={btnName}
              disabled={disabled}
              onClick={event => onClickFn({
                name: btnName,
                eventInfo: event
              })}>
        {btnText}
      </Button>
    </div>
  )
}

export default ButtonComponent
