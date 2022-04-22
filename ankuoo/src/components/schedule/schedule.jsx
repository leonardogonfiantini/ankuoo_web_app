import React, {useState} from 'react'

import './schedule.scss'

import ScheduleRow from '../ScheduleRow/ScheduleRow'

import plusBtn from './images/plus-button.png'
import closeModal from './images/cross.png'
import upBtn from './images/up.png'
import downBtn from './images/down.png'
import dotdot from './images/dotdot.png'

function Schedule() {


  function openModalSchedule() {
    var modal = document.querySelector('#modal-schedule')
    modal.classList.add('active')
  }

  function closeModalSchedule() {
    var modal = document.querySelector('#modal-schedule')
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


  const [schedules, setSchedules] = useState([])
  const [id, setId] = useState(0)

  function CreateSchedule() {
    setSchedules(
      [...schedules, <ScheduleRow key={id} id={id} time={hour + ':' + minute} /> ]
    )
    setId(id + 1)
  }

  return (
    <div className='schedule'>
      <div className="schedule-create">
        <img src={plusBtn} onClick={openModalSchedule} alt="open modal" />

        <div id="modal-schedule" className="modal-schedule">
          <div className="modal-content">
            <h2> Create schedule </h2>
            <img src={closeModal} id='close-modal-schedule' className='close-modal' onClick={closeModalSchedule} alt="close modal" />

              <div className="set-schedule">

              <div className='from'>
                <h3 className='title'> From </h3> 
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

              <div className='to'>
                <h3 className='title'> To </h3>
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

            </div>

            <button className='create-button' onClick={CreateSchedule}> Create </button>
          </div>
        </div>
      </div>

    <div id="schedule-rows" className="schedule-rows">
        {schedules}
    </div>
  </div>
  )
}

export default Schedule