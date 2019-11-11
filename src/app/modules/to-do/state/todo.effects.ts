import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap, take, catchError } from 'rxjs/operators';
import { TodoService } from '@app/modules/to-do/services/todo.service';
import {
    loadTodos,
    loadTodosSuccess,
    updateTodoById,
    updateTodoByIdSuccess,
    createTodo,
    createTodoSuccess,
    loadTodoById,
    loadTodoByIdSuccess,
    deleteTodoById,
    deleteTodoByIdSuccess
} from '@app/modules/to-do/state/todo.actions';

@Injectable()
export class TodoEffects {

    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(loadTodos),
        mergeMap(() => this.todoService.getTodos()
            .pipe(
                map(todos => loadTodosSuccess({ payload: todos })),
                catchError(() => EMPTY)
            ))
    ));

    loadTodoById$ = createEffect(() => this.actions$.pipe(
        ofType(loadTodoById),
        mergeMap(({ payload }) => this.todoService.getTodoById(payload)
            .pipe(
                map(todos => {
                    return loadTodoByIdSuccess({ payload: todos });
                }),
                catchError(() => EMPTY)
            ))
    ));

    updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(updateTodoById),
        switchMap(({ payload }) => this.todoService.updateTodoById(payload)
            .pipe(
                map(() => updateTodoByIdSuccess({ payload })),
                catchError(() => EMPTY)
            ))
    ));

    createTodo$ = createEffect(() => this.actions$.pipe(
        ofType(createTodo),
        switchMap(({ payload }) => this.todoService.createTodo(payload)
            .pipe(
                map((todo) => createTodoSuccess({ payload: todo })),
                catchError(() => EMPTY)
            ))
    ));

    deleteTodo$ = createEffect(() => this.actions$.pipe(
        ofType(deleteTodoById),
        switchMap(({ payload }) => this.todoService.deleteTodoById(payload)
            .pipe(
                map(() => deleteTodoByIdSuccess({ payload })),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private todoService: TodoService
    ) { }
}
