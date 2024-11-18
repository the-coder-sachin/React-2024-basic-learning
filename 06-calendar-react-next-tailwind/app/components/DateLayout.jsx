import React, { useEffect, useState } from 'react'

const DateLayout = ({generateCalendar, today, chooseDate}) => {
    const [calendar, setCalendar] = useState(generateCalendar(today));
    useEffect(() => {
       setCalendar(()=>generateCalendar(today))
      return () => {
      }
    }, [today])
    
    
    
  return (
    <div className='border rounded-lg p-2 min-h-80 shadow-md mt-2 font-bold'>
    {calendar.map((days, idx)=>{
        return(
            <div key={idx} className='flex justify-between'>
                {days.map((day, idx)=>{
                    if(day === today.getDate()){
                        return (
                          <div
                            onClick={() => {
                              chooseDate(day);
                            }}
                            key={idx}
                            className='text-center bg-[#f59e0c] rounded-xl border-4 size-12 flex justify-center items-center border-[#433517] cursor-pointer'
                          >
                            {day}
                          </div>
                        );
                    }else{return (
                      <div
                        onClick={() => {
                          chooseDate(day);
                        }}
                        key={idx}
                        className={
                          day
                            ? "day size-12 text-white flex justify-center items-center  rounded-xl cursor-pointer hover:text-teal-300 active:bg-[#f59e0c] active:border-[#433517] active:border-4"
                            : "day size-12 "
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