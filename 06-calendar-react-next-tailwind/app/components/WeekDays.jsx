import React from 'react'

const WeekDays = () => {
  return (
    <div className='flex justify-between border p-2 font-bold text-teal-400 rounded-lg'>
        <div className="day w-16 text-center capitalize text-xl">s</div>
        <div className="day w-16 text-center capitalize text-xl">m</div>
        <div className="day w-16 text-center capitalize text-xl">t</div>
        <div className="day w-16 text-center capitalize text-xl">w</div>
        <div className="day w-16 text-center capitalize text-xl">t</div>
        <div className="day w-16 text-center capitalize text-xl">f</div>
        <div className="day w-16 text-center capitalize text-xl">s</div>
    </div>
  )
}

export default WeekDays