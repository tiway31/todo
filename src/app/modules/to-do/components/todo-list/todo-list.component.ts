import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '@app/modules/to-do/services/todo.service';
import { Todo } from '@app/shared/models/todo';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTodos, updateTodoById, createTodo } from '@app/modules/to-do/state/todo.actions';
import { State } from '@app/modules/to-do/state/todo.state';

@Component({
  selector: 'ads-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  maxTodoId = 0;
  todoForm: FormGroup;
  showFormTodo = false;
  todoState$: Observable<State>;

  constructor(private router: Router, private todoService: TodoService, private store: Store<{ count: number }>) {
    this.todoState$ = store.pipe(select('todoState'));
  }

  ngOnInit() {
    this.todoForm = this.createTodoForm();
    this.getTodos();
    this.store.dispatch(loadTodos());
  }

  getTodos() {
    this.todoService.getTodos().subscribe(datas => {
      this.todos = datas;
      this.maxTodoId = Math.max.apply(Math, this.todos.map(t => t.id)) + 1;
      // console.log(this.maxTodoId);
      // console.log('todos Array:', this.todos);
    });
  }

  createTodoForm() {
    return new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl(''),
      status: new FormControl('undone')
    });
  }

  get title() {
    return this.todoForm.get('title');
  }

  createTodo(formDirective: FormGroupDirective) {
    this.todoForm.patchValue({ id: this.maxTodoId, status: 'undone' });
    if (this.todoForm.valid) {
      this.store.dispatch(createTodo({ payload: this.todoForm.value }));
      this.todoState$.subscribe(() => {
        this.handleSuccess(this.todoForm.value, formDirective);
      });
    }
  }

  showTodoForm() {
    this.showFormTodo = !this.showFormTodo;
    this.todoForm.reset();
  }

  chechedTodo(evt, todo) {
    if (evt.checked) {
      todo.status = 'done';
      this.store.dispatch(updateTodoById({ payload: todo }));
    } else {
      todo.status = 'undone';
      this.store.dispatch(updateTodoById({ payload: todo }));
    }
  }

  deleteTodo(todo) {
    this.todoService.deleteTodoById(todo.id).subscribe(datas => {
      this.getTodos();
    })
  }

  todoDetail(todo) {
    this.router.navigate(['todo/detail', todo.id]);
    console.log(todo.id);
  }

  handleSuccess(data, formDirective) {
    console.log('last todo inserted', data);
    this.todoForm.reset();
    formDirective.resetForm();
    this.showTodoForm();
    this.getTodos();
  }

  handleError(error) {
    console.log('todo not added', error);
  }
}
