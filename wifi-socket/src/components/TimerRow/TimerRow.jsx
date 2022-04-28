import React, {useState} from 'react'

import './TimerRow.scss'

import deleteBtn from './delete.png'

function TimerRow({id, time, status}) {

  function deleteRow() {
    var obj = document.querySelector('#id-timer'+id)

    const fetchDelete = async() => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({timer: time})
      }
    
      const response = await fetch("/api/timer/delete", requestOptions)
      console.log(response)
    }

    fetchDelete()

    obj.remove()

  }


  const [checked, setChecked] = useState(status)

  function isChecked() {

    checked === '1' ? setChecked('0') : setChecked('1')

    const fetchUpdate = async() => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({timer: time, status: checked === '1' ? '0' : '1'})
      }
    
      const response = await fetch("/api/timer/update", requestOptions)
      console.log(response)
    }

    fetchUpdate()

  }

  return (
    <div id={'id-timer'+id} className='TimerRow'>

        <label className="switch">
        <input type="checkbox" checked={checked != '0' ? true : false} onClick={isChecked} onChange={e => {}} />
        <span className="slider round"/>
        </label>

        <p className='time'> {time} </p>

        <img src={deleteBtn} alt="delete timer" onClick={deleteRow} />


    </div>
  )
}

export default TimerRow