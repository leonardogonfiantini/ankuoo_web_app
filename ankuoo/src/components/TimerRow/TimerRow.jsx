import React from 'react'

import './TimerRow.scss'

function TimerRow() {
  return (
    <div className='TimerRow'>

        <label className="switch">
        <input type="checkbox"/>
        <span className="slider round"/>
        </label>

        <p className='time'> 20:34 </p>

    </div>
  )
}

export default TimerRow