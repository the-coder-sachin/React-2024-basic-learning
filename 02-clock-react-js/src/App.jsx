import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [hour, sethour] = useState(0);
  const [minute, setminute] = useState(0);
  const [second, setsecond] = useState(0);
  const [time, settime] = useState("");
  const [date, setdate] = useState("");
  useEffect(() => {
    let timeInterval = setInterval(() => {
      let date = new Date();
      let currentDate = date.toLocaleDateString();
      let currentTime = date.toLocaleTimeString();

      setdate(currentDate);
      settime(currentTime);
    }, 1000);

    return () => {};
  }, []);

  const checkTiming = () => {
    let time = new Date().getHours();
    if (time < 12) {
      return `good morning`;
    } else if (time == 12) {
      return `good noon`;
    } else if (time > 12 && time <= 18) {
      return `good afternoon`;
    } else {
      return `good night`;
    }
  };

  return (
    <>
      <div className="clock">
        <div className="display">
          <div className="time">{time}</div>
          <div className="date">{date}</div>
        </div>
        <div className="msg">{checkTiming()} ~sachin</div>
      </div>
    </>
  );
}

export default App;
