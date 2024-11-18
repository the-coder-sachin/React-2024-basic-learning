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
    <div className="flex justify-between text-white my-6 ">
      <div className="day font-bold text-xl">{weekdays[today.getDay()]}</div>
      <div className="date font-semibold text-lg">
        {" "}
        {months[today.getMonth()]}, {today.getDate()} , {today.getFullYear()}
      </div>
    </div>
  );
}

export default CalendarHeader