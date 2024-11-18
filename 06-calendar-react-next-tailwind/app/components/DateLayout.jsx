import React, { useEffect, useState } from 'react'

const DateLayout = ({generateCalendar, today, chooseDate}) => {
    const [calendar, setCalendar] = useState(generateCalendar(today));
    useEffect(() => {
       setCalendar(()=>generateCalendar(today))
      return () => {
      }
    }, [today])
    
    
    
  return (
    <div className='border p-2 bg-cyan-400 min-h-80 shadow-md'>
    {calendar.map((days, idx)=>{
        return(
            <div key={idx} className='flex  justify-between '>
                {days.map((day, idx)=>{
                    if(day === today.getDate()){
                        return (
                          <div
                            onClick={()=>{chooseDate(day)}}
                            key={idx}
                            className={
                              day
                                ? "day text-center w-16 bg-pink-500 m-1 p-2 rounded-full cursor-pointer "
                                : "day text-center w-16 m-1 p-2 rounded-full "
                            }
                          >
                            {day}
                          </div>
                        );
                    }else{return (
                      <div
                        onClick={()=>{chooseDate(day)}}
                        key={idx}
                        className={
                          day
                            ? "day text-center w-16 bg-cyan-500 m-1 p-2 rounded-full cursor-pointer hover:bg-cyan-700 active:bg-pink-500"
                            : "day text-center w-16 m-1 p-2 rounded-full "
                        }
                        
                      >
                        {day}
                      </div>
                    );}
                })}
            </div>
        )
    })}
    </div>
  )
}

export default DateLayout