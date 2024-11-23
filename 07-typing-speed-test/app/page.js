'use client'
import React, { useEffect, useRef, useState } from 'react'


const page = () => {
  const typingTestSentences = [
    "In the fast-paced world of technology, the ability to type quickly and accurately has become an essential skill for professionals in almost every field. Typing tests not only measure your speed but also highlight your ability to focus and minimize errors under pressure, skills that are invaluable in today's work environment.",
    "The art of effective communication lies in the clarity and precision of your words, whether spoken or typed. A well-constructed sentence not only conveys your message but also reflects your thought process. Practicing typing with complex sentences helps improve both your cognitive skills and your ability to organize ideas logically.",
    "As technology continues to advance, the way we interact with computers has evolved dramatically. What once required handwritten communication or slow keyboard inputs has now transformed into seamless and fast-paced digital exchanges. Mastering the keyboard is no longer a specialized skill but a basic requirement for productivity in the modern age.",
    "Typing efficiently is not just about pressing keys faster; it is about developing a rhythm and a mindset that allows your thoughts to flow onto the screen effortlessly. The balance between speed and accuracy comes with consistent practice, where every keystroke becomes an extension of your intent to communicate effectively.",
    "When you sit down to practice typing, it is important to focus not only on how fast you can type but also on maintaining a relaxed posture and steady breathing. A calm mind allows for better coordination between your hands and eyes, which ultimately leads to faster and more accurate typing. Remember, consistency in practice will always outweigh short bursts of intense effort.",
  ];

  const [currentSentence, setCurrentSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [intervalID, setIntervalID] = useState('');
  const [timer, setTimer] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [cpm, setCpm] = useState(0);
  const timeBar = useRef()

  useEffect(() => {
    if(timer>0){
      document.addEventListener("keydown", handlekeypress);
    }
    return () => {
      document.removeEventListener('keydown', handlekeypress)
    }
  }, [isStarted, userInput]);


  useEffect(() => {
    setCurrentSentence(
      typingTestSentences[
        Math.round(Math.random() * typingTestSentences.length)
      ]
    );

  
  }, [])
  
  useEffect(() => {
    
    let timeout, intervalId;
     if(isStarted && timer > 0){
      intervalId = setInterval(() => {
        setTimer(prev=> prev -1);
      }, 1000);
      
    }else if(timer === 1){
      clearInterval(intervalId);
    }
    calculateResult()

    setIntervalID(intervalId);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setIsStarted(false);
      clearInterval(intervalID);

    }, 1500);
  
    return () => {
      clearInterval(intervalID)
      clearTimeout(timeout)
    }
  }, [isStarted])
  
  
  const handlekeypress = (e)=>{
    const alphabets = [
      " ",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "_",
      "=",
      "+",
      "[",
      "]",
      "{",
      "}",
      ";",
      ":",
      "'",
      '"',
      "\\",
      "|",
      ",",
      ".",
      "<",
      ">",
      "/",
      "?",
      "`",
      "~",
    ];
    if(e.key === 'Backspace'){
      setUserInput(prev=>prev.slice(0,-1));
    }else if(alphabets.includes(e.key)){
      setUserInput(prev=>prev+e.key);
    }
    setIsStarted(true);
  }

  const calculateResult = ()=>{
    const wordsCount = userInput.trim().split(' ');
    const correctWords = wordsCount.filter(
      (word, idx)=> word === currentSentence.split(' ')[idx]
    )
    const wordsPerMin = Math.round((correctWords.length / 30)*60);
    const totalCorrectWords = correctWords.length;
    const totalMistakes = wordsCount.filter(
      (word, idx)=> word != currentSentence.split(' ')[idx])
    setCpm(totalCorrectWords);
    setMistakes(totalMistakes.length);

    setWpm(wordsPerMin);
  }

 
  const renderSentence = () =>{
    return currentSentence.split('').map((char, idx)=>{
      const typedChar = userInput[idx];
      const iscurrent = idx === userInput.length;
      let color = 'white';

      if(typedChar === undefined){
        color = 'white';
      }else if(typedChar === char){
        color = "#66BB6A";
      }else{
        color = "#E53935";
      }
      return (
        <span
          key={idx}
          style={{
            color,
            borderBottom: iscurrent ? "2px solid white" : "none",
            transition: "color 0.2s ease, border-bottom 0.2s ease",
            fontWeight: "bold",
          }}
        >
          {char}
        </span>
      );
    })
  }
  useEffect(() => {
    timeBar.current.style.width = `${100 - ((timer/60)*100)}%`
  
    return () => {
      
    }
  }, [timer])
  
  
  

  return (
    <>
    <nav className='flex justify-between px-6 py-2 bg-orange-400 text-white'>
      <h1 className='font-bold'>typing speed test</h1>
      <h2>1 min typing test</h2>
      <h2 className="timer font-bold">00:{timer}</h2>
    </nav>
    <div ref={timeBar} className={`timer-bar h-2 ease-in-out bg-green-400 transition-all absolute`}></div>
    <div className="text-area h-[448px] p-16 bg-blue-950 text-white text-2xl leading-loose tracking-widest">{currentSentence ? renderSentence(): ``}</div>
    <div className="result flex justify-between items-center bg-blue-400 h-[69px] px-20">
      <p className='font-bold text-white'>mistakes: {mistakes}</p>
      <p className='font-bold text-white'>WPM: {wpm}</p>
      <p className='font-bold text-white'>CPM: {cpm}</p>
    </div>
    </>
  )
}

export default page