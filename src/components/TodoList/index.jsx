import React, { useEffect, useReducer, useState } from 'react';
import { createTodo, setTodos } from '../../store/actions';
import reducer, { initialState } from '../../store/reducer';
import shortid from 'shortid';

function TodoList() {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState('ALL');

    const onCreateTodo = (e) => {
        if (e.key === 'Enter' && e.target.value !== 'null') {
            dispatch(createTodo({
                content: e.target.value,
                created_date: new Date().toISOString(),
                status: 'ACTIVE',
                id: shortid(),
                user_id: 'firstUser'
            }));
            e.target.value = '';
        }
    }

    // useEffect(() => {
    //     dispatch(setTodos([]))
    // }, []);

    // const showTodos = todos.filter((todo) => {
    //     switch (showing) {
    //         case 'ACTIVE':
    //             return todo.status === 'ACTIVE';
    //         case 'COMPLETE':
    //             return todo.status === 'COMPLETE';
    //         default:
    //             return true;
    //     }
    // })

    return (
        <div>
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onKeyUp={(e) => onCreateTodo(e)}
                />
            </header>
            <section className="main">
                <input id="toggle-all" className="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <li key={index} className="completed">
                            <div className="view">
                                <input className="toggle" type="checkbox" defaultChecked />
                                <label>{todo.content}</label>
                                <button className="destroy"></button>
                            </div>
                            <input className="edit" defaultValue="Create a TodoMVC template" />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default TodoList;