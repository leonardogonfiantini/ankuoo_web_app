import React, { useState} from 'react'

import './timer.scss'
  
import TimerRow from '../TimerRow/TimerRow'

import plusBtn from './images/plus-button.png'
import closeModal from './images/cross.png'
import upBtn from './images/up.png'
import downBtn from './images/down.png'
import dotdot from './images/dotdot.png'

function Timer() {

  function openModalTimer() {
    var modal = document.querySelector('#modal-timer')
    modal.classList.add('active')
  }

  function closeModalTimer() {
    var modal = document.querySelector('#modal-timer')
    modal.classList.remove('active')
  }

  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')

  function upHour() {
    var hours = parseInt(hour) + 1;
    if (hours <= 9) hours = '0' + hours
    setHour(hours)
  }

  function downHour() {
    if (hour > 0) {
      var hours = parseInt(hour) - 1;
      if (hours <= 9) hours = '0' + hours
      setHour(hours)
    }
  }

  function upMinute() {
    if (minute < 59) {
      var minutes = parseInt(minute) + 1;
      if (minutes <= 9) minutes = '0' + minutes
      setMinute(minutes)
    } else {
      upHour()
      setMinute('00')
    }
  }

  function downMinute() {
    if (minute > 0) {
      var minutes = parseInt(minute) - 1;
      if (minutes <= 9) minutes = '0' + minutes
      setMinute(minutes)
    } else {
      setMinute('59')
    }
  }

  return (
    <div className='timer'>
      <div className="timer-create">
        <img src={plusBtn} onClick={openModalTimer} alt="open modal" />

        <div id="modal-timer" className="modal">
          <div className="modal-content">
            <h2> Create timer </h2>
            <img src={closeModal} id='close-modal-timer' className='close-modal' onClick={closeModalTimer} alt="close modal" />

            <div className="set-timer">
              <div className="hour">
                <img className="up" src={upBtn} onClick={upHour} alt="up arrow hour" />
                <p> {hour} </p>
                <img className="down" src={downBtn} onClick={downHour} alt="down arrow hour" />
              </div>

              <img className="dotdot" src={dotdot} alt="dotdot"/>

              <div className="minutes">
                <img className="up" src={upBtn} onClick={upMinute} alt="up arrow minutes" />
                <p> {minute} </p>
                <img className="down" src={downBtn} onClick={downMinute} alt="down arrow minutes" />
              </div>
            </div>

            <button className='create-button'> Create </button>
          </div>
        </div>

      </div>

      <div className="timer-rows">
        <ul>
          <li>
            <TimerRow></TimerRow>
          </li>
          <li>
            <TimerRow></TimerRow>
          </li>
          <li>
            <TimerRow></TimerRow>
          </li>
          <li>
            <TimerRow></TimerRow>
          </li>
          <li>
            <TimerRow></TimerRow>
          </li>
        </ul>
      </div>
    </div>
  )

}

export default Timer