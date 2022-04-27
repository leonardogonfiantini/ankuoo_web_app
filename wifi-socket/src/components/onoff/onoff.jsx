import React, { useState, useRef, useEffect } from 'react'
import './onoff.scss'

import button_on from './power-button-on.png'
import button_off from './power-button-off.png'

function OnOff() {
  
  const [status, setStatus] = useState('0');

  function buttonSetStatus(e) {

    var time = new Date().getTime()

    const fetchUpdate = async() => {
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({status: status === '0' ? '1' : '0',
                              time: time})
      }
    
      const response = await fetch("/api/onoff/update", requestOptions)
      const json = await response.json()

      setOnOffData(json)
      isready(true)
    }

    fetchUpdate()

    if (status === '0') {
      e.target.setAttribute('src', button_off)
      setStatus('1');
      startTimer(time)
    }
    else {
      e.target.setAttribute('src', button_on)
      setStatus('0');
      clearTimer()
    }

  }


  const Ref = useRef(null);

  const [timer_btn, setTimer] = useState('00:00:00')

  function startTimer(oldtime) {  

    const idtimer = setInterval(() => {
      var now = new Date().getTime();
    
      var distance = now - oldtime;
    
      var timer_hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var timer_minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var timer_seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      setTimer(
        (timer_hours <= 9 ? '0' + timer_hours : timer_hours) + ':' + 
        (timer_minutes <= 9 ? '0' + timer_minutes : timer_minutes) + ':' + 
        (timer_seconds <= 9 ? '0' + timer_seconds : timer_seconds)
      )

    }, 1000)

    Ref.current = idtimer

  }
  
  function clearTimer(e) {
    setTimer('00:00:00')
    clearInterval(Ref.current)
  }



  const [onoffData, setOnOffData] = useState({})
  const [ready, isready] = useState(false)

  useEffect(() => {

    const fetchData = async() => {
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
    
      const response = await fetch("/api/onoff/get", requestOptions)
      const json = await response.json()

      setOnOffData(json)
      isready(true)
    }

    fetchData()

  }, [])

  useEffect(() => {
      if (!ready) return
      else {
        setStatus(onoffData[0].status)
        var time = new Date(onoffData[0].time)
        console.log(time)
        if (onoffData[0].status === '1') startTimer(time);
      }
  }, [ready])


  var button_status = button_off;
  if (status === '1') button_status = button_on

  return (
    <div className='onoff'>
      <img src={button_status} id='button-img' onClick={buttonSetStatus} alt="onoff button" /> 
      <p id="timer-text"> {timer_btn} </p> 
    </div>
  )
}

export default OnOff