import { createReducer, on } from '@ngrx/store';
import {
    loadTodosSuccess,
    updateTodoByIdSuccess,
    createTodoSuccess
} from '@app/modules/to-do/state/todo.actions';
import { State } from '@app/modules/to-do/state/todo.state';

export const initialState: State = {
    todos: []
};

const _todoReducer = createReducer(initialState,
    on(loadTodosSuccess, (state, { payload }) => {
        state.todos = payload.sort((a, b) => (a.status < b.status) ? 1 : -1);
        // state.todos = payload;
        return state;
    }),
    on(updateTodoByIdSuccess, (state) => {
        state.todos.sort((a, b) => (a.status < b.status) ? 1 : -1);
        return state;
    }),
    on(createTodoSuccess, (state, { payload }) => {
        state.todos.push(payload);
        state.todos.sort((a, b) => (a.status < b.status) ? 1 : -1);
        return state;
    })

);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}
