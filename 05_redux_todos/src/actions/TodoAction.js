/**
 * Created by xxx on 2017/4/1.
 */
let nextTodoId = 0;

export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
};

export const setVisibleFilter = (filter) => {
    return {
        type: 'SET_VISIBLE_FILTER',
        filter
    }
};

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
};