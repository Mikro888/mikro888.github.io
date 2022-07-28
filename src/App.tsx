import React, {useState} from 'react';
import './App.css';
import {ToDo} from "./todo";
import {v1} from "uuid";

//types
export type TaskType = {
    id: string
    name: string
    status: boolean
}
export type TodolistType = Array<TaskType>
export type FilterValueType = "all" | "active" | "completed"

//state
let todoList: TodolistType = []

//component
function App() {

    //hooks
    const [actualTodo, setActualTodo] = useState<TodolistType>(todoList)
    const [filter, setFilter] = useState<FilterValueType>('all')

    //functions
    const changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue)
    }
    const addTask = (name: string) => {
        if (actualTodo.length > 11) {
            return
        }
        let newId = v1()
        let newTask = {id: newId, name, status: false}
        setActualTodo([...actualTodo, {...newTask}])
    }
    const clearCompleted = () => {
        setActualTodo(actualTodo.filter(t => !t.status))
    }
    const changeTaskStatus = (id: string) => {
        setActualTodo(actualTodo.map(t => t.id === id ? {
            ...t,
            status: !t.status
        } : t))
    }

    //filter rendering conditions
    let tasksForRender = actualTodo
    if (filter === 'active') {
        tasksForRender = actualTodo.filter(t => !t.status)
    }
    if (filter === 'completed') {
        tasksForRender = actualTodo.filter(t => t.status)
    }
    //tsx
    return (
        <div>
            <ToDo todoList={tasksForRender}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  clearCompleted={clearCompleted}
                  filter={filter}
            />
        </div>
    );
}

export default App;
