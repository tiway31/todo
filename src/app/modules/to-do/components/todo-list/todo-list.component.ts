import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store} from '@ngrx/store';
import { Observable} from 'rxjs';
import { loadTodos, updateTodoById, createTodo, deleteTodoById } from '@app/modules/to-do/state/todo.actions';
import { State } from '@app/modules/to-do/state/todo.state';


@Component({
  selector: 'ads-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  maxTodoId = 0;
  todoForm: FormGroup;
  showFormTodo = false;
  todoState$: Observable<State>;

  constructor(private router: Router, private store: Store<State>) {
    this.todoState$ = store.select('todoState');
  }

  ngOnInit() {
    this.todoForm = this.createTodoForm();
    this.store.dispatch(loadTodos());
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
    this.todoState$.subscribe(td => {
      if (td.todos.length > 0) {
        this.maxTodoId = Math.max.apply(Math, td.todos.map(t => t.id)) + 1;
      }
    });
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
    this.store.dispatch(deleteTodoById({ payload: todo }));
  }

  todoDetail(todo) {
    this.router.navigate(['detail', todo.id]);
  }

  handleSuccess(data, formDirective) {
    console.log('last todo inserted', data);
    this.todoForm.reset();
    formDirective.resetForm();
    this.showTodoForm();
  }

  handleError(error) {
    console.log('todo not added', error);
  }
}
