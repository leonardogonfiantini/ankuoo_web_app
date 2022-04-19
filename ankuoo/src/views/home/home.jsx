import React from 'react'

import './home.scss'

import OnOff from '../../components/onoff/onoff'
import Schedule from '../../components/schedule/schedule'
import Stats from '../../components/stats/stats'
import Timer from '../../components/timer/timer'

function Home() {

  function buttonStatus(e, wName) {
    
    var active = document.querySelector('.active')
    if(active != null) active.classList.remove('active')
  
    e.target.classList.add('active')

    widgetShow(wName);
  }

  function widgetShow(wName) {
    
    var widgets = document.getElementById('widgets')
    var obj_active = document.querySelector('.objactive')
    if (obj_active != null) {
      obj_active.style.display = 'none'
      widgets.appendChild(obj_active)
    }

    var item2 = document.getElementById('item2')
    var obj = document.getElementById(wName)
    obj.style.display = 'block';
    obj.classList.add('objactive')
    item2.appendChild(obj)
  }

  function timerClick(e) {buttonStatus(e, 'timers');}
  function scheduleClick(e) {buttonStatus(e, 'schedules');}
  function statsClick(e) {buttonStatus(e, 'stats');}

  if (window.innerWidth <= 900) {
      document.addEventListener('DOMContentLoaded', function(){ widgetShow('timers')}, false);
  }

  return (
    <div className='home'>
        <div className='item1 onoff' > <OnOff /> </div>   

        <div id='item2' className='item2'>
          <div className='navbar'> 
            <ul>
              <li> <button id='timer-pill' className='active' onClick={timerClick}> Timer </button> </li>
              <li> <button id='schedule-pill' onClick={scheduleClick}> Schedule </button> </li>
              <li> <button id='stats-pill' onClick={statsClick}> Stats </button> </li>
            </ul>
          </div>
        </div>  


        <div id='schedules' className='schedules'> <Schedule /> </div>
        <div id='stats' className='stats'> <Stats /> </div>
        <div id='timers' className='timers'> <Timer /> </div>  

        <div id='widgets' className="widgets"> </div>
    </div>
  )

}

export default Home