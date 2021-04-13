import React, { useEffect, useReducer, useState } from 'react';
import { createTodo, setTodos } from '../../store/actions';
import reducer, { initialState } from '../../store/reducer';
import shortid from 'shortid';

function Header() {

    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState('ALL');

    useEffect(() => {
        dispatch(setTodos([]))
    }, [])

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

    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                onKeyUp={(e) => onCreateTodo(e)}
            />
        </header>
    );
}

export default Header;