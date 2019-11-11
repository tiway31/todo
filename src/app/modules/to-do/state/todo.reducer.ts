import { createReducer, on } from '@ngrx/store';
import {
    loadTodosSuccess,
    updateTodoByIdSuccess,
    createTodoSuccess,
    loadTodoByIdSuccess,
    deleteTodoByIdSuccess
} from '@app/modules/to-do/state/todo.actions';
import { State } from '@app/modules/to-do/state/todo.state';
import { Todo } from '@app/shared/models/todo';

export const initialState: State = {
    todos: []
};

let tmp: Todo;

const _todoReducer = createReducer(initialState,
    on(loadTodosSuccess, (state, { payload }) => {
        state.todos = payload.sort((a, b) => (a.status < b.status) ? 1 : -1);
        return state;
    }),
    on(loadTodoByIdSuccess, (state, { payload }) => {
        state.todos = payload;
        return state;
    }),
    on(updateTodoByIdSuccess, (state, { payload }) => {
        if (payload.status === 'done') {
            tmp = state.todos[state.todos.indexOf(payload)];
            state.todos.splice(state.todos.indexOf(payload), 1);
            state.todos.push(tmp);
        } else {
            tmp = state.todos[state.todos.indexOf(payload)];
            state.todos.splice(state.todos.indexOf(payload), 1);
            state.todos.unshift(tmp);
        }
        return state;
    }),
    on(createTodoSuccess, (state, { payload }) => {
        state.todos.unshift(payload);
        return state;
    }),
    on(deleteTodoByIdSuccess, (state, { payload }) => {
        state.todos.splice(state.todos.indexOf(payload), 1);
        return state;
    })

);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}
