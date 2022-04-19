import React from 'react'

import './timer.scss'

import plusBtn from './plus-button.png'


function Timer() {

  function createTimer() {
    var modal = document.querySelector('#modal')
    modal.classList.add('active')
  }

  return (
    <div className='timer'>
      <div className="timer-create">
        <img src={plusBtn} onClick={createTimer}/>

        <div id="modal" className="modal">
          <div className="modal-content">
            <p> Ciao mondo </p>
          </div>
        </div>

      </div>

      <div className="timer-row">
        timer row -------------------------- <br/>
        timer row -------------------------- <br/> 
        timer row -------------------------- <br/>
        timer row -------------------------- <br/>
        timer row -------------------------- <br/>
        timer row -------------------------- <br/>
        timer row -------------------------- <br/>
        timer row -------------------------- <br/>
        timer row -------------------------- <br/>
        timer row -------------------------- <br/>
        timer row -------------------------- <br/>

      </div>
    </div>
  )

}

export default Timer