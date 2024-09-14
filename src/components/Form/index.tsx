import React, { useState } from "react";
import Button from "../Button";
import style from './Form.module.scss';
import { ITask } from "../../types/task";
import {v4 as uuidv4} from 'uuid';

interface Props {
    setTask:React.Dispatch<React.SetStateAction<ITask[]>>
}

function Form({setTask}: Props) {
    const [tarefa, setTarefa] = useState('');
    const [tempo, setTempo] = useState('00:00');

    function addTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setTask(oldTasks => 
            [
                ...oldTasks, 
                {
                    tarefa,
                    tempo,
                    selecionado: false,
                    completado: false,
                    id: uuidv4()
                }
            ]
        );
        setTarefa("");
        setTempo("00:00");
    }

    return(
        <form className={style.novaTarefa} onSubmit={addTask}>
            <div className={style.inputContainer}>
                <label htmlFor="tarefa">
                    Adicione um novo estudo
                </label>
                <input 
                    type="text"
                    name="tarefa"
                    id="tarefa"
                    value={tarefa}
                    onChange={evento => setTarefa(evento.target.value)}
                    placeholder="O que você quer estudar?"
                    required />
            </div>

            <div className={style.inputContainer}>
                <label htmlFor="tempo">
                    Tempo
                </label>
                <input 
                    type="time" 
                    step="1"
                    name="tempo"
                    value={tempo}
                    onChange={evento => setTempo(evento.target.value)}
                    id="tempo"
                    min="00:00:00"
                    max="01:30:00"
                    required />
            </div>
            <Button type="submit">
                Adicionar
            </Button> 
        </form>
    )
}

export default Form;