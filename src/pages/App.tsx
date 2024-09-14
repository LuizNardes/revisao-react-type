import React, { useState } from 'react';
import Form from '../components/Form';
import List from '../components/List';
import style from './App.module.scss';
import Stopwatch from '../components/Stopwatch';
import { ITask } from '../types/task';

function App() {
  const [tasks, setTask] = useState<ITask[]>([]);
  const [selected, setSelected] = useState<ITask>();

  function selectTask(selectedTask: ITask) {
    setSelected(selectedTask);
    setTask(oldTasks => oldTasks.map(task => ({
      ...task,
      selecionado: task.id === selectedTask.id ? true : false
    }))) 
  }

  function finalizarTarefa() {
    if (selected) {
      setSelected(undefined);
      setTask(oldTasks =>
        oldTasks.map(task => {
          if (task.id === selected.id) {
            return {
              ...task,
              selecionado: false,
              completado: true
            };
          }
          return task;
        })
      )
    }
  }

  return (
    <div className={style.AppStyle}>
      <Form setTask={setTask}/>
      <List 
        tasks={tasks}
        selectTask={selectTask}
      />
      <Stopwatch 
        selected={selected}
        finalizarTarefa={finalizarTarefa}  
      />
    </div>
  );
}

export default App;
