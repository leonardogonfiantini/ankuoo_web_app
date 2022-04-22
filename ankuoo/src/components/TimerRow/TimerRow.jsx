import React from 'react'

import './TimerRow.scss'

import deleteBtn from './delete.png'

function TimerRow({id, time}) {

  function deleteRow() {
    var obj = document.querySelector('#id-timer'+id)
    obj.remove()
  }


  return (
    <div id={'id-timer'+id} className='TimerRow'>

        <label className="switch">
        <input type="checkbox"/>
        <span className="slider round"/>
        </label>

        <p className='time'> {time} </p>

        <img src={deleteBtn} alt="delete timer" onClick={deleteRow} />


    </div>
  )
}

export default TimerRow