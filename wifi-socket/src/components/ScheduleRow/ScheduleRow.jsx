import React, {useState} from 'react'

import './ScheduleRow.scss'

import deleteBtn from './images/delete.png'
import calendar from './images/calendar.png'

function ScheduleRow({id, from, to, mon, tue, wed, thu, fri, sat, sun, status}) {

  var daystring = ''
  if (mon === '1') daystring += 'mon/'
  if (tue === '1') daystring += 'tue/'
  if (wed === '1') daystring += 'wed/'
  if (thu === '1') daystring += 'thu/'
  if (fri === '1') daystring += 'fri/'
  if (sat === '1') daystring += 'sat/'
  if (sun === '1') daystring += 'sun/'

  function deleteRow() {
    var obj = document.querySelector('#id-schedule'+id)
    
    const fetchDelete = async() => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({from: from, to: to, mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun})
      }
    
      const response = await fetch("/api/schedule/delete", requestOptions)
      console.log(response)
    }

    fetchDelete()
    
    obj.remove()
  }

  function showDays() {
    var pdays = document.querySelector('#calendar-info'+id)
    if (pdays.style.display === 'block')
      pdays.style.display = 'none'
    else
      pdays.style.display = 'block';
  }

  const [checked, setChecked] = useState(status)

  function isChecked() {

    checked === '1' ? setChecked('0') : setChecked('1')

    const fetchUpdate = async() => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({from: from, to: to, 
                              mon: mon, tue: tue, wed: wed, thu: thu, fri: fri, sat: sat, sun: sun, 
                              status: checked === '1' ? '0' : '1'})
      }
    
      const response = await fetch("/api/schedule/update", requestOptions)
      console.log(response)
    }

    fetchUpdate()

  }

  return (
    <div id={'id-schedule'+id} className='ScheduleRow'> 

    <label className="switch">
      <input type="checkbox" checked={checked === '1' ? true : false} onClick={isChecked} onChange={e => {}}/>
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