'use client'
import React from 'react'
import { useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import WeekDays from './components/WeekDays';
import DateLayout from './components/DateLayout';
import ChangeMonths from './components/ChangeMonths';


const page = () => {
  // get current day (date)
  const [today, setToday] = useState(new Date());


  // function to generate the array of calendar
  const generateCalendar = (today) =>{
    // using 2D array to store calendar 
    const calendar = [[]];

     const firstDateOfMonth = new Date(
       today.getFullYear(),
       today.getMonth(),
       1
     ).getDay();

     const lastDateOfMonth = new Date(
       today.getFullYear(),
       today.getMonth() + 1,
       0
     ).getDate();

     let week = 0;

     for (let i = 0; i < firstDateOfMonth; i++) {
       calendar[week].push(null);
     }
     for (let i = 1; i <= lastDateOfMonth; i++) {
       if (calendar[week].length === 7) {
         week++;
         calendar[week] = [];
       }
       calendar[week].push(i);
     }
     while (calendar[week].length < 7) {
       calendar[week].push(null);
     }
     return calendar;
  
  }
 
  // switch calendar to prev or next month
  const changeMonth = (val) =>{
    setToday(new Date(today.setMonth(today.getMonth() + val)));    
  }
  

  // select date 
  const chooseDate = (date) =>{
    setToday(new Date(today.setDate(date)));
  }
  
  
  
  return (
    <>
      <div className="bg bg-[#020617] h-screen w-screen text-cyan-100 flex items-center justify-center select-none">
        <div className="calendar bg-[#020617] flex flex-col shadow-2xl rounded-lg p-6 border ">
          <ChangeMonths changeMonth={changeMonth} />
          <CalendarHeader today={today} />
          <WeekDays />
          <DateLayout
            generateCalendar={generateCalendar}
            today={today}
            chooseDate={chooseDate}
          />
        </div>
      </div>
    </>
  );
}

export default page