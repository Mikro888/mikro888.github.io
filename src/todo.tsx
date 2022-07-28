import {FilterValueType, TodolistType} from "./App";
import React, {useState} from "react";
import {Button, Card, Checkbox, Input} from "antd";
import {
    DeleteOutlined,
    PlusCircleOutlined
} from "@ant-design/icons";

//types
type TodoPropsType = {
    todoList: TodolistType
    changeFilter: (filter: FilterValueType) => void
    addTask: (name: string) => void
    changeTaskStatus: (id: string) => void
    clearCompleted: () => void
    filter: FilterValueType

}
//component
export const ToDo = (props: TodoPropsType) => {

    //handlers
    const changeFilterHandler = props.changeFilter
    const addTaskHandler = (name: string) => {
        if (name === '') {
            setError(true)
            return
        }
        props.addTask(name.trim());
        setNewTask('')
    }
    const changeStatusHandler = props.changeTaskStatus
    const clearCompletedHandler = props.clearCompleted
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && newTask !== '') {
            addTaskHandler(newTask)
        }
    }
    //hooks
    const [newTask, setNewTask] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    //tsx
    return (
        <Card title={<span className={'title'}>ToDo</span>}
              className={'card'}
              onKeyPress={handleKeyPress}
        >

            <Input status={error ? 'error' : ''} value={newTask}
                   onChange={(e) => {
                       setNewTask(e.currentTarget.value);
                       setError(false)
                   }}
            />
            <Button type='default' icon={<PlusCircleOutlined/>}
                    onClick={() => addTaskHandler(newTask)}/>
            <div className={'tasksSection'}>
                <ul>
                    {props.todoList.map(t => <li key={t.id}
                                                 className={!t.status ? '' : 'checked'}>
                            {t.name}
                            <Checkbox
                                type="checkbox"
                                checked={t.status}
                                onChange={() => changeStatusHandler(t.id)}
                                className={'checkBox'}
                            />
                        </li>
                    )}
                </ul>
            </div>

            <div className={'buttonSection'}>
                <Button type={props.filter === 'all' ? "primary" : "default"}
                        onClick={() => changeFilterHandler('all')}>All</Button>
                <Button type={props.filter === 'active' ? "primary" : "default"}
                        onClick={() => changeFilterHandler('active')}>Active
                </Button>
                <Button
                    type={props.filter === 'completed' ? "primary" : "default"}
                    onClick={() => changeFilterHandler('completed')}>Completed
                </Button>
                <div>
                    <Button className={'clearButton'} type="default"
                            onClick={clearCompletedHandler}
                            icon={<DeleteOutlined/>}>Clear completed</Button>
                </div>

            </div>

        </Card>
    )

}
