import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { TodoService } from '@app/modules/to-do/services/todo.service';
import {
    loadTodos,
    loadTodosSuccess,
    updateTodoById,
    updateTodoByIdSuccess,
    createTodo,
    createTodoSuccess
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

    updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(updateTodoById),
        switchMap(({ payload }) => this.todoService.updateTodoById(payload)
            .pipe(
                map(() => updateTodoByIdSuccess()),
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

    constructor(
        private actions$: Actions,
        private todoService: TodoService
    ) { }
}
