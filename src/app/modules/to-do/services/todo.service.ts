import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { Todo } from '@app/shared/models/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'api/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        map(data => {
          return data.sort((a, b) => (a.status < b.status) ? 1 : -1);
        }),
        catchError(this.handleError)
      )
  }

  getTodoById(id): Observable<Todo> {
    return this.http.get<Todo>(`${this.todosUrl}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo)
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateTodoById(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.todosUrl}/${todo.id}`, todo)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTodoById(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.todosUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
