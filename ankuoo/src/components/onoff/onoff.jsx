import React, { useState, useRef, useEffect } from 'react'
import './onoff.scss'

import button_on from './power-button-on.png'
import button_off from './power-button-off.png'

function OnOff() {
  
  const [status, setStatus] = useState(0);

  function buttonSetStatus(e) {

    if (status == 0) {
      e.target.setAttribute('src', button_off)
      setStatus(status + 1);
      startTimer();
    }
    else {
      e.target.setAttribute('src', button_on)
      setStatus(status - 1);
      clearTimer()
    }
  }


  const Ref = useRef(null);

  const [timer, setTimer] = useState('00:00:00')

  function startTimer(oldtime) {  

    var oldtime = new Date().getTime();

    const id = setInterval(() => {
      var now = new Date().getTime();
    
      var distance = now - oldtime;
    
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      setTimer(
        (hours <= 9 ? '0' + hours : hours) + ':' + 
        (minutes <= 9 ? '0' + minutes : minutes) + ':' + 
        (seconds <= 9 ? '0' + seconds : seconds)
      )
    }, 1000)

    Ref.current = id

  }
  
  function clearTimer(e) {
    setTimer('00:00:00')
    clearInterval(Ref.current)
  }

  useEffect(() => {
      if (timer != "00:00:00")
        clearTimer()
  }, []);

  var button_status = button_off;
  if (status == 1) button_status = button_on

  return (
    <div className='onoff'>
      <img src={button_status} id='button-img' onClick={buttonSetStatus}/> 
      <p id="timer-text"> {timer} </p> 
    </div>
  )
}

export default OnOff