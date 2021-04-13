import React, { useReducer, useState } from "react";
import shortid from "shortid";

// deleteAllTodos,
import {
  createTodo,
  editTodo,
  deleteTodo,
  deleteCompletedTodos,
  toggleAllTodos,
  updateTodoStatus,
  updateTodo,
  cancelEditTodo,
} from "../../store/actions";
import reducer, { initialState } from "../../store/reducer";
// import PropTypes from "prop-types";

TodoPage.propTypes = {};

function TodoPage() {
  const [{ todos, editIndex }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState("ALL");

  const onCreateTodo = (e) => {
    if (e.key === "Enter" && e.target.value !== "null") {
      dispatch(
        createTodo({
          content: e.target.value,
          created_date: new Date().toISOString(),
          status: "ACTIVE",
          id: shortid(),
          user_id: "firstUser",
        })
      );
      e.target.value = "";
    }
  };

  const onUpdateTodo = (e, todoId) => {
    if (e.key === "Enter") {
      dispatch(updateTodo(todoId, e.target.value.trim()));
      // e.target.value = "";
    } else if (e.key === "Escape") {
      dispatch(cancelEditTodo());
    }
  };

  const onBlurUpdateTodo = (e, todoId) => {
    dispatch(updateTodo(todoId, e.target.value.trim()));
  };

  //   const onDeleteTodo = (todoId) => {
  //     dispatch(deleteTodo(todoId));
  //   };

  const onUpdateTodoStatus = (e, todoId) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  //   const onDeleteAllTodo = () => {
  //     dispatch(deleteAllTodos());
  //     };

  const onClearCompletedTodo = () => {
    dispatch(deleteCompletedTodos());
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case "ACTIVE":
        return todo.status === "ACTIVE";
      case "COMPLETED":
        return todo.status === "COMPLETED";
      default:
        return true;
    }
  });

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            // autofocus="true"
            onKeyUp={onCreateTodo}
          />
        </header>
        {/* <!-- This section should be hidden by default and shown when there are todos --> */}
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={onToggleAllTodo}
            checked={
              showTodos.every((todo) => todo.status === "COMPLETED") &&
              "checked"
            }
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {showTodos.map((todo, index) => (
              <li
                key={index}
                className={`${todo.status === "COMPLETED" && "completed"} ${
                  editIndex === index && "editing"
                }`}
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.status === "COMPLETED" && "checked"}
                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                  />
                  <label onDoubleClick={() => dispatch(editTodo(index))}>
                    {todo.content}
                  </label>
                  <button
                    className="destroy"
                    onClick={() => dispatch(deleteTodo(index))}
                  ></button>
                </div>
                <input
                  className="edit"
                  defaultValue={todo.content}
                  onKeyUp={(e) => onUpdateTodo(e, todo.id)}
                  onBlur={(e) => onBlurUpdateTodo(e, todo.id)}
                  autoFocus
                />
              </li>
            ))}
          </ul>
        </section>
        {/* <!-- This footer should hidden by default and shown when there are todos --> */}
        {todos.length > 0 && (
          <footer className="footer">
            {/* <!-- This should be `0 items left` by default --> */}
            <span className="todo-count">
              <strong>{showTodos.length}</strong> item left
            </span>
            {/* <!-- Remove this if you don't implement routing --> */}
            <ul className="filters">
              <li onClick={() => setShowing("ALL")}>
                <a className={`${showing === "ALL" && "selected"}`} href="#/">
                  All
                </a>
              </li>
              <li onClick={() => setShowing("ACTIVE")}>
                <a
                  className={`${showing === "ACTIVE" && "selected"}`}
                  href="#/active"
                >
                  Active
                </a>
              </li>
              <li onClick={() => setShowing("COMPLETED")}>
                <a
                  className={`${showing === "COMPLETED" && "selected"}`}
                  href="#/completed"
                >
                  Completed
                </a>
              </li>
            </ul>
            {/* <!-- Hidden if no completed items are left ↓ --> */}
            <button className="clear-completed" onClick={onClearCompletedTodo}>
              Clear completed
            </button>
          </footer>
        )}
      </section>
    </div>
  );
}

export default TodoPage;
