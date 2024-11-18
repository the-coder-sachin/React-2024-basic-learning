import React from 'react'

const CalendarHeader = ({today}) => {

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

  return (
    <div className='flex justify-between text-white mb-4'>
        <div className="day">{weekdays[today.getDay()]}</div>
        <div className="date">{today.getDate()} {months[today.getMonth()]} {today.getFullYear()}</div>
    </div>
  )
}

export default CalendarHeader