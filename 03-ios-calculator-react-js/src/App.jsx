import React from "react";
import { useState } from "react";
// calculator

function App() {
  const [secondDisplay, setsecondDisplay] = useState("");
  const [display, setDisplay] = useState("");

  const addToDisplay = (val) => {
    const operators = ["+", "-", "*", "%", "/", ".", ];
    let lastChar = display.slice(-1);
    if (
      (operators.includes(lastChar) && operators.includes(val)) ||
      (val == 0 && display == '') ||
      (val == '00' && display == '' || display == '0') ||
      (val == '.' && display =='' || display == '0' || display == '00') 
    ) {
      return;
    }
    setDisplay((prev) => {
      if (prev.length < 8) {
        return `${prev}${val}`;
      } else {
        return prev;
      }
    });
  };

  const allClear = () => {
    setDisplay("");
    setsecondDisplay("");
  };

  const backspace = () => {
    setDisplay((prev) => {
      if (prev.slice(0, -1) == "") {
        setsecondDisplay("");
      }
      return prev.slice(0, -1);
    });
  };

  const evaluate = () => {
    let lastChar = display.slice(-1);
    const invalidChar = ["+", "-", "*", "%", "/", "."];
    const operatorsRegex = /[+\-%*/]/;
    if (invalidChar.includes(lastChar)) {
      return;
    }
    if (operatorsRegex.test(display)) {
      setsecondDisplay(display);
      setDisplay((prev) => String(eval(prev)));
    }
  };

  return (
    <>
      <div className="mobile">
        <div className="calculator">
          <div className="sec-display">{secondDisplay}</div>
          <div className="display">{display || 0}</div>
          <div className="btns">
            <button
              onClick={() => {
                allClear();
              }}
              className="l-grey ac"
            >
              AC
            </button>
            <button onClick={backspace} className="l-grey">
              <span className="material-symbols-outlined backspace">
                backspace
              </span>
            </button>
            <button
              onClick={() => {
                addToDisplay("%");
              }}
              className="l-grey"
            >
              <i className="fa-solid fa-percent"></i>
            </button>
            <button
              onClick={() => {
                addToDisplay("/");
              }}
              className="orng"
            >
              <i className="fa-solid fa-divide"></i>
            </button>
            <button
              onClick={() => {
                addToDisplay("7");
              }}
              className="d-grey"
            >
              7
            </button>
            <button
              onClick={() => {
                addToDisplay("8");
              }}
              className="d-grey"
            >
              8
            </button>
            <button
              onClick={() => {
                addToDisplay("9");
              }}
              className="d-grey"
            >
              9
            </button>
            <button
              onClick={() => {
                addToDisplay("*");
              }}
              className="orng"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <button
              onClick={() => {
                addToDisplay("4");
              }}
              className="d-grey"
            >
              4
            </button>
            <button
              onClick={() => {
                addToDisplay("5");
              }}
              className="d-grey"
            >
              5
            </button>
            <button
              onClick={() => {
                addToDisplay("6");
              }}
              className="d-grey"
            >
              6
            </button>
            <button
              onClick={() => {
                addToDisplay("-");
              }}
              className="orng"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <button
              onClick={() => {
                addToDisplay("1");
              }}
              className="d-grey"
            >
              1
            </button>
            <button
              onClick={() => {
                addToDisplay("2");
              }}
              className="d-grey"
            >
              2
            </button>
            <button
              onClick={() => {
                addToDisplay("3");
              }}
              className="d-grey"
            >
              3
            </button>
            <button
              onClick={() => {
                addToDisplay("+");
              }}
              className="orng"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <button
              onClick={() => {
                addToDisplay("00");
              }}
              className="d-grey"
            >
              00
            </button>
            <button
              onClick={() => {
                addToDisplay("0");
              }}
              className="d-grey"
            >
              0
            </button>
            <button
              onClick={() => {
                if (!display.includes(".")) {
                  addToDisplay(".");
                }
              }}
              className="d-grey"
            >
              .
            </button>
            <button onClick={evaluate} className="orng">
              <i className="fa-solid fa-equals"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
