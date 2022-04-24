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

  const [FromHour, setFromHour] = useState('00')
  const [FromMinute, setFromMinute] = useState('00')

  function upFromHour() {
    var hours = parseInt(FromHour) + 1;

    if (hours <= 9) hours = '0' + hours
    if (hours === 24) hours = '00'
    setFromHour(hours)
    
    if (FromHour >= ToHour) upToHour()
    if (FromHour > ToHour) setToHour(parseInt(FromHour) + 1 === 24 ? '00' : ('0' + parseInt(FromHour) + 1).slice(-2))
  }

  function downFromHour() {

      if (FromHour > 0) {
        var hours = parseInt(FromHour) - 1;
        if (hours <= 9) hours = '0' + hours
        setFromHour(hours)
      } else {
        setFromHour('23')
      }
  }

  function upFromMinute() {

    if (FromHour === ToHour) {
      if (FromMinute+1 > ToMinute) setToMinute(parseInt(FromMinute)+1 === 60 ? '00' : ('0' + (parseInt(FromMinute) + 1)).slice(-2))
    }

    if (FromMinute < 59) {
      var minutes = parseInt(FromMinute) + 1;
      if (minutes <= 9) minutes = '0' + minutes
      setFromMinute(minutes)
    } else {
      upFromHour()
      setFromMinute('00')
    }
  }

  function downFromMinute() {
    if (FromMinute > 0) {
      var minutes = parseInt(FromMinute) - 1;
      if (minutes <= 9) minutes = '0' + minutes
      setFromMinute(minutes)
    } else {
      setFromMinute('59')
    }
  }

  const [ToHour, setToHour] = useState('00')
  const [ToMinute, setToMinute] = useState('00')

  function upToHour() {
    var hours = parseInt(ToHour) + 1;
    hours = hours === 24 ? 0 : hours
    if (hours < FromHour) 
      hours = FromHour
    else {
        if (hours <= 9) hours = '0' + hours
        if (hours >= 24) hours = '00'
    }
    setToHour(hours)
  }

  function downToHour() {
    if (ToHour > 0 && ToHour > FromHour) {
      var hours = parseInt(ToHour) - 1;
      if (hours <= 9) hours = '0' + hours
      setToHour(hours)
    } else {
      setToHour('23')
    }
  }

  function upToMinute() {
    if (ToMinute < 59) {
      var minutes = parseInt(ToMinute) + 1;
      if (minutes <= 9) minutes = '0' + minutes
      setToMinute(minutes)
    } else {
      upToHour()
      setToMinute('00')
    }
  }

  function downToMinute() {
    if (ToMinute > 0) {
      var minutes = parseInt(ToMinute) - 1;
      if (minutes <= 9) minutes = '0' + minutes
      setToMinute(minutes)
    } else {
      setToMinute('59')
    }
  }

  function activeDay(e) {
    if (!e.target.classList.contains('activeDay'))
      e.target.classList.add('activeDay')
    else
      e.target.classList.remove('activeDay')
  }


  const [schedules, setSchedules] = useState([])
  const [id, setId] = useState(0)

  function CreateSchedule() {

    var days = document.getElementsByClassName('activeDay')

    setSchedules(
      [...schedules, <ScheduleRow 
                        key={id} 
                        id={id} 
                        from={FromHour + ':' + FromMinute} 
                        to={ToHour + ':' + ToMinute}
                        days={days}
                      /> ]
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
                  <img className="up" src={upBtn} onClick={upFromHour} alt="up arrow hour" />
                  <p> {FromHour} </p>
                  <img className="down" src={downBtn} onClick={downFromHour} alt="down arrow hour" />
                </div>

                <img className="dotdot" src={dotdot} alt="dotdot"/>

                <div className="minutes">
                  <img className="up" src={upBtn} onClick={upFromMinute} alt="up arrow minutes" />
                  <p> {FromMinute} </p>
                  <img className="down" src={downBtn} onClick={downFromMinute} alt="down arrow minutes" />
                </div>
              </div>

              <div className='to'>
                <h3 className='title'> To </h3>
                <div className="hour">
                  <img className="up" src={upBtn} onClick={upToHour} alt="up arrow hour" />
                  <p> {ToHour} </p>
                  <img className="down" src={downBtn} onClick={downToHour} alt="down arrow hour" />
                </div>

                <img className="dotdot" src={dotdot} alt="dotdot"/>

                <div className="minutes">
                  <img className="up" src={upBtn} onClick={upToMinute} alt="up arrow minutes" />
                  <p> {ToMinute} </p>
                  <img className="down" src={downBtn} onClick={downToMinute} alt="down arrow minutes" />
                </div>


                <div className="days">

                    <h2> Days </h2>
                    
                    <button id="mon" onClick={activeDay}> Mon </button>
                    <button id="tue" onClick={activeDay}> Tue </button>
                    <button id="wed" onClick={activeDay}> Wed </button>
                    <button id="thu" onClick={activeDay}> Thu </button>
                    <button id="fri" onClick={activeDay}> Fri </button>
                    <button id="sat" onClick={activeDay}> Sat </button>
                    <button id="sun" onClick={activeDay}> Sun </button>

                </div>

              </div>

            </div>

            <button className='create-button'onClick={CreateSchedule} > Create </button>
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