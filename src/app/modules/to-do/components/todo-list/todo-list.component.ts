import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '@app/modules/to-do/services/todo.service';
import { Todo } from '@app/shared/models/todo';

@Component({
  selector: 'ads-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  todosLength = 0;
  maxTodoId = 0;
  todoForm: FormGroup;
  showFormTodo = false;

  constructor(private router: Router, private todoService: TodoService) { }

  ngOnInit() {
    this. todoForm = this.createTodoForm();
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(datas => {
    this.todos = datas;
    this.todosLength = datas.length;
    this.maxTodoId = Math.max.apply(Math, this.todos.map(t => t.id))+1;
    console.log(this.maxTodoId);
    console.log('todos Array:', this.todos);
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
    this.todoForm.patchValue({id: this.maxTodoId, status: 'undone'});
    if (this.todoForm.valid) {
      this.todoService.createTodo(this.todoForm.value)
        .subscribe(
          data => {
              this.handleSuccess(data, formDirective);
          },
          error => {
              this.handleError(error);
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
      this.todoService.updateTodoById(todo).subscribe(datas => {
        this.getTodos();
      });
    } else {
      todo.status = 'undone';
      this.todoService.updateTodoById(todo).subscribe(datas => {
        this.getTodos();
      });
    }
  }

  deleteTodo(todo) {
    this.todoService.deleteTodoById(todo.id).subscribe(datas => {
      this.getTodos();
    })
  }

  todoDetail(todo){
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
