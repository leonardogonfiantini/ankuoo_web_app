import React from 'react'

import './ScheduleRow.scss'

import deleteBtn from './images/delete.png'
import calendar from './images/calendar.png'

function ScheduleRow({id, from, to, days}) {

  var daystring = ''
  for (let i = 0; i < days.length; i++) daystring += days[i].id + '/'

  function deleteRow() {
    var obj = document.querySelector('#id-schedule'+id)
    obj.remove()
  }

  function showDays() {
    var pdays = document.querySelector('#calendar-info'+id)
    if (pdays.style.display === 'block')
      pdays.style.display = 'none'
    else
      pdays.style.display = 'block';
  }

  return (
    <div id={'id-schedule'+id} className='ScheduleRow'> 

    <label className="switch">
      <input type="checkbox"/>
      <span className="slider round"/>
    </label>

      <p className='time'> from: {from} </p>
      <p className='time'> to: {to} </p>

      <img className="calendar" src={calendar} alt="calendar" onClick={showDays}/>
      <p id={"calendar-info"+id} className='calendar-info'> {daystring} </p>


      <img className="delete" src={deleteBtn} alt="garbage can" onClick={deleteRow} />
      
    </div>
  )
}

export default ScheduleRow;