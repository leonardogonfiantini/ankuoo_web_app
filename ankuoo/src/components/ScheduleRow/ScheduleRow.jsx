import React from 'react'

import './ScheduleRow.scss'

import deleteBtn from './images/delete.png'
import calendar from './images/calendar.png'

function ScheduleRow({id, from, to}) {
  return (
    <div id={'schedule-row-'+id} className='ScheduleRow'> 

    <label className="switch">
      <input type="checkbox"/>
      <span className="slider round"/>
    </label>

      <p className='time'> from: {from} </p>
      <p className='time'> to: {to} </p>

      <img className="calendar" src={calendar} alt="calendar"/>
      <img className="delete" src={deleteBtn} alt="garbage can" />
      
    </div>
  )
}

export default ScheduleRow;