import React from 'react'
import OnOff from '../../components/onoff/onoff'

import './home.scss'

import Schedule from '../../components/schedule/schedule'
import Stats from '../../components/stats/stats'
import Timer from '../../components/timer/timer'

function Home() {
  return (


    <div className='home'>
        <div className='item1' > 
            <OnOff />
        </div>   

        <div className='item2'> 
            <Stats />
            <Schedule />
            <Timer />
        </div> 
        
    </div>
  )
}

export default Home