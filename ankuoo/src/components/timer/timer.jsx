import React from 'react'

import './timer.scss'

import plusBtn from './plus-button.png'


function Timer() {

  function prova() {
    return 'ciao';
  }

  return (
    <div className='timer'>
      <div className="timer-create">
        <img src={plusBtn} />
      </div>

      <div className="timer-row">
        timer row -------------------------- <br/>
        timer row -------------------------- <br /> 
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