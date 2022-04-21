import React from 'react'

import './TimerRow.scss'

function TimerRow() {
  return (
    <div className='TimerRow'>

        <label class="switch">
        <input type="checkbox"/>
        <span class="slider round"/>
        </label>

        <p className='time'> 20:34 </p>

    </div>
  )
}

export default TimerRow