import React from 'react'

import './ScheduleRow.scss'

import deleteBtn from './images/delete.png'
import calendar from './images/calendar.png'

function ScheduleRow() {
  return (
    <div className='ScheduleRow'> 

    <label class="switch">
      <input type="checkbox"/>
      <span class="slider round"/>
    </label>

      <p className='time'> from: 20:34 </p>
      <p className='time'> to: 20:34 </p>

      <img className="calendar" src={calendar} alt="calendar"/>
      <img className="delete" src={deleteBtn} alt="garbage can" />
      
    </div>
  )
}

export default ScheduleRow;