import React from 'react'

const Step = ({children, label}) => {
  return (
    <div className='asinyo__stepper__body'>
        {children}
    </div>
  )
}

export default Step