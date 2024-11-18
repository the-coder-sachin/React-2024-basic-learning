import React from 'react'

const WeekDays = () => {
  return (
    <div className='flex justify-between border p-2 font-bold'>
        <div className="day w-16 text-center">sun</div>
        <div className="day w-16 text-center">mon</div>
        <div className="day w-16 text-center">tue</div>
        <div className="day w-16 text-center">wed</div>
        <div className="day w-16 text-center">thu</div>
        <div className="day w-16 text-center">fri</div>
        <div className="day w-16 text-center">sat</div>
    </div>
  )
}

export default WeekDays