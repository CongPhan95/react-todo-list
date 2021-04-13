
export const initialState = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    editIndex: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodos = [...state.todos];
            if (action.payload.content) {
                newTodos.push(action.payload);
                localStorage.setItem("todos", JSON.stringify(newTodos));
            }

            return {
                ...state,
                todos: newTodos
            };
        
        case 'EDIT_TODO':
            return {
                ...state,
                editIndex: action.payload
            }
        
        case 'UPDATE_TODO':
            if (state.editIndex !== null) {
                if (action.payload.content) {
                    state.todos[state.editIndex].content = action.payload.content;
                    localStorage.setItem("todos", JSON.stringify(state.todos));
                } else {
                    state.todos.splice(state.editIndex, 1);
                    localStorage.setItem("todos", JSON.stringify(state.todos));
                }
                state.editIndex = null;
            }

            return {
                ...state,
                todos: state.todos
            }
        
        case 'CANCEL_EDIT_TODO':
            return {
                ...state,
                editIndex: null
            }

        case 'UPDATE_TODO_STATUS':
            const index1 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
            state.todos[index1].status = action.payload.checked ? 'COMPLETED' : 'ACTIVE';
            localStorage.setItem("todos", JSON.stringify(state.todos));

            return {
                ...state,
                todos: state.todos
            }

        case 'TOGGLE_ALL_TODOS':
            const tempTodos = state.todos.map((e) => {
                return {
                    ...e,
                    status: action.payload ? 'COMPLETED' : 'ACTIVE'
                }
            })
            localStorage.setItem("todos", JSON.stringify(tempTodos));

            return {
                ...state,
                todos: tempTodos
            }

        case 'DELETE_TODO':
            const newTodos2 = [...state.todos];
            newTodos2.splice(action.payload, 1);
            localStorage.setItem("todos", JSON.stringify(newTodos2));

            return {
                ...state,
                todos: newTodos2
            }

        case 'DELETE_COMPLETED_TODOS':
            // const newTodos3 = [...state.todos];
            const newTodos3 = state.todos.filter((newTodo3) => newTodo3.status === 'ACTIVE');
            localStorage.setItem("todos", JSON.stringify(newTodos3));

            return {
                ...state,
                todos: newTodos3
            }

        case 'DELETE_ALL_TODOS':
            localStorage.setItem("todos", JSON.stringify([]));

            return {
                ...state,
                todos: []
            }

        default:
            return state;
    }
}

export default reducer;