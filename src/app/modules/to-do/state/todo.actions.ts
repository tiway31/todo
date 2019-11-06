import { createAction, props } from '@ngrx/store';
import { Todo } from '@app/shared/models/todo';

export const loadTodos = createAction('[Todos Page] Load');
export const loadTodosSuccess = createAction('[Todos API] Todos Loaded Success', props<{ payload: Todo[]}>());

export const loadTodoById = createAction('[Todo ById Page] Load', props<{ payload: number}>());
export const loadTodoByIdSuccess = createAction('[Todo ById API] Todo Loaded Success', props<{ payload: Todo[]}>());

export const updateTodoById = createAction('[Todo Page] Update', props<{ payload: Todo}>());
export const updateTodoByIdSuccess = createAction('[Todo API] Todo Updated Success');

export const createTodo = createAction('[Todo Page] Create', props<{ payload: Todo}>());
export const createTodoSuccess = createAction('[Todo API] Todo Created Success', props<{ payload: Todo}>());

export const deleteTodoById = createAction('[Todo deleteById Page] Load', props<{ payload: number}>());
export const deleteTodoByIdSuccess = createAction('[Todo deleteById API] Todo Loaded Success', props<{ payload: number}>());