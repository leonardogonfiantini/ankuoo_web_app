import React from 'react'
import OnOff from '../../components/onoff/onoff'

import './home.scss'

import Schedule from '../../components/schedule/schedule'
import Stats from '../../components/stats/stats'
import Timer from '../../components/timer/timer'

function Home() {


  function timerClick(e) {
    var active = document.querySelector('.active')
    active.classList.remove('active')
  
    e.target.classList.add('active')

    var obj = document.getElementById('timer')
    obj.style.display = 'block';
    obj.classList.add('obj-active')


    var item2 = document.getElementById('item2')
    var obj_active = document.getElementsByClassName('obj-active')
    item2.appendChild(obj)
  }

  function scheduleClick(e) {
    var active = document.querySelector('.active')
    active.classList.remove('active')  
    
    e.target.classList.add('active')

    var obj = document.getElementById('schedule')
    obj.style.display = 'block';
    obj.classList.add('obj-active')


    var item2 = document.getElementById('item2')
    var obj_active = document.getElementsByClassName('obj-active')
    item2.appendChild(obj)
  }

  function statsClick(e) {
    var active = document.querySelector('.active')
    active.classList.remove('active')

    e.target.classList.add('active')

    var obj = document.getElementById('stats')
    obj.style.display = 'block'
    obj.classList.add('obj-active')

    var item2 = document.getElementById('item2')
    var obj_active = document.getElementsByClassName('obj-active')
    item2.appendChild(obj)
  }


  return (
    <div className='home'>
        <div className='item1 onoff' > 
            <OnOff />
        </div>   

        <div id='item2' className='item2'>
          <div className='navbar'> 
            <ul>
              <li> <button id='timer-pill' className='active' onClick={timerClick}> Timer </button> </li>
              <li> <button id='schedule-pill' onClick={scheduleClick}> Schedule </button> </li>
              <li> <button id='stats-pill' onClick={statsClick}> Stats </button> </li>
            </ul>
          </div>
        </div>  

        <div className="widgets">
          <div id='schedule' className='schedule'> <Schedule /> </div>
          <div id='stats' className='stats'> <Stats /> </div>
          <div id='timer' className='timer'> <Timer /> </div>  
        </div>
    </div>
  )

}

export default Home