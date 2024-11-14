import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [miliseconds, setMiliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let secinterval;
    let milisecinterval;
    if (isRunning) {
      secinterval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      milisecinterval = setInterval(() => {
        setMiliseconds((prev) => prev + 1);
      }, 100);
    } else {
      clearInterval(secinterval);
      clearInterval(milisecinterval);
    }
    return () => {
      clearInterval(secinterval);
      clearInterval(milisecinterval);
    };
  }, [isRunning]);

  const toggleStart = () => {
    setIsRunning((prev) => !prev);
  };
  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMiliseconds(0);
  };

  return (
    <>
      <div className="nav">
        <div className="imgs-logo">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React (STOPWATCH) </h1>
      </div>
      <div className="stopwatch">
        <div className="container">
          <div className="display">
            {seconds < 10 ? `0${seconds}` : seconds}:
            {miliseconds < 10 ? `0${miliseconds}` : miliseconds}
          </div>
          <div className="controls">
            <button
              onClick={toggleStart}
              className={isRunning ? `stop btn` : `start btn`}
            >
              {isRunning ? `stop` : `start`}
            </button>
            <button onClick={reset} className="reset btn">
              reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
