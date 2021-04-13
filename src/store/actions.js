export const setTodos = (todos) => {
    return {
        type: "SET_TODO",
        payload: todos,
    };
};

export const createTodo = (todo) => {
    return {
        type: "ADD_TODO",
        payload: todo,
    };
};

export const editTodo = (index) => {
    return {
        type: "EDIT_TODO",
        payload: index,
    }
}

export const updateTodo = (todoId, content) => {
    return {
        type: "UPDATE_TODO",
        payload: {
            todoId,
            content,
        },
    };
};

export const cancelEditTodo = () => {
    return {
        type: "CANCEL_EDIT_TODO",
    }
}

export const updateTodoStatus = (todoId, checked) => {
    return {
        type: "UPDATE_TODO_STATUS",
        payload: {
            todoId,
            checked,
        },
    };
};

export const deleteTodo = (todoId) => {
    return {
        type: "DELETE_TODO",
        payload: todoId,
    };
};

export const deleteAllTodos = () => {
    return {
        type: "DELETE_ALL_TODOS",
    };
};

export const deleteCompletedTodos = () => {
    return {
        type: "DELETE_COMPLETED_TODOS",
    };
};

export const toggleAllTodos = (checked) => {
    return {
        type: 'TOGGLE_ALL_TODOS',
        payload: checked,
    };
};
