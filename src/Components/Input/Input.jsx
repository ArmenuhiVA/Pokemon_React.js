import React, {forwardRef} from 'react'
import './Input.css'


function Input (props) {
  return (
    <input className='input'
      {...props}
    />
  )
}

export default Input
