import React from 'react'

const ChangeMonths = ({ changeMonth }) => {
  return (
    <div className="flex justify-between">
      <button
        className="bg-cyan-400 text-xl p-1 px-2 rounded-full hover:bg-cyan-200 hover:text-cyan-500"
        onClick={()=>{changeMonth(-1)}}
      >
        ←
      </button>
      <span id="monthYear"></span>
      <button
        className="bg-cyan-400 text-xl p-1 px-2 rounded-full hover:bg-cyan-200 hover:text-cyan-500"
        onClick={()=>{changeMonth(1)}}
      >
        →
      </button>
    </div>
  );
};

export default ChangeMonths