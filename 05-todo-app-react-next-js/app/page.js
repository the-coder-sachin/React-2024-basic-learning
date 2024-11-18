"use client";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [delayMsg, setDelayMsg] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);


  const fakeDelay = () =>{
    setTimeout(() => {
      setSimulationDelay(false);
    }, 2000);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    setDelayMsg('hold on we are adding your task...')
    setTimeout(() => {
      setDelayMsg('')
      setIsSubmiting(false)
      setTaskList([...taskList, { title, desc, iscompeleted: false }]);
    }, 2000);
    setTitle("");
    setDesc("");
  };

  const deleteTask = (i) =>{
    setTaskList(
      taskList.filter((task, ind) => {
        if (!ind == i) {
          return task;
        }
      })
    );
  }

  const editTask = (i) =>{
    let task = taskList[i];
    setTitle(task.title);
    setDesc(task.desc);
    deleteTask(i);
  }

  const toggleCompelte = (i) =>{
    setTaskList(taskList.map((task, idx)=>{
      if(i==idx){
        return {...task, iscompeleted: !task.iscompeleted}
      }
      else{
        return task;
      }
    }))
  }

  return (
    <>
      <h1 className="text-center text-5xl font-bold bg-zinc-700 text-white pb-5 pt-2">
        My Todo App
      </h1>
      <p className="text-center text-slate-700 animate-pulse ">{delayMsg}</p>
      <form className="text-xl flex items-center flex-wrap justify-center">
        <input
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="title"
          className="p-3 rounded-md m-5 outline-none border-zinc-400 border-2 w-72"
        />
        <input
          type="text"
          required
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          placeholder="description"
          className="p-3 rounded-md m-5 outline-none border-zinc-400 border-2 w-96"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmiting}
          className={
            isSubmiting
              ? `bg-zinc-300 rounded-md text-zinc-600 font-semibold p-3 px-7 mx-5`
              : `bg-zinc-600 rounded-md text-zinc-100 font-semibold p-3 px-7 mx-5`
          }
        >
          add
        </button>
      </form>
      <hr className="mt-5 border-2" />
      <div className="list-container flex flex-col p-4 gap-2">
        {taskList.length > 0 ? (
          taskList.map((task, i) => {
            return (
              <div
                key={i}
                className="task-container flex items-center p-2 gap-3"
              >
                <input type="checkbox"
                onClick={e=>{toggleCompelte(i)}}
                checked={task.iscompeleted} />
                <div
                  className={
                    task.iscompeleted
                      ? `flex flex-col border p-2 w-full line-through`
                      : `flex flex-col border p-2 w-full`
                  }
                >
                  <div className="title border-b text-slate-600">
                    <span className="text-red-300">title: </span>
                    {task.title}
                  </div>
                  <div className="desc text-sm text-zinc-400">
                    <span className="text-red-300">description: </span>
                    {task.desc}
                  </div>
                </div>
                <button
                  onClick={() => {
                    editTask(i);
                  }}
                  className="p-2 bg-slate-500 text-yellow-50"
                >
                  edit
                </button>
                <button
                  onClick={() => {
                    deleteTask(i);
                  }}
                  className="p-2 bg-slate-500 text-yellow-50"
                >
                  delete
                </button>
              </div>
            );
          })
        ) : (
          <h1 className="text-4xl text-center text-slate-400">
            no tasks yet...
          </h1>
        )}
      </div>
    </>
  );
}
