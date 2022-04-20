import React from 'react'

import './timer.scss'

import plusBtn from './plus-button.png'
import closeModal from './cross.png'

function Timer() {

  function openModalTimer() {
    var modal = document.querySelector('#modal-timer')
    modal.classList.add('active')
  }

  function closeModalTimer() {
    var modal = document.querySelector('#modal-timer')
    modal.classList.remove('active')
  }

  return (
    <div className='timer'>
      <div className="timer-create">
        <img src={plusBtn} onClick={openModalTimer}/>

        <div id="modal-timer" className="modal">
          <div className="modal-content">
            <h2> Create timer </h2>
            <img src={closeModal} id='close-modal-timer' className='close-modal' onClick={closeModalTimer}/>
            <button className='create-button'> Create </button>
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