import React from 'react'
import './onoff.scss'

import button from './power-button-on.png'

function OnOff() {
  return (
    <div className='onoff'>
      <img src={button}/> 
      <p> Time </p> 
    </div>
  )
}

export default OnOff