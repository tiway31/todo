import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from '@app/shared/models/todo';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTodoById } from '@app/modules/to-do/state/todo.actions';
import { State } from '@app/modules/to-do/state/todo.state';

@Component({
  selector: 'ads-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  todoId: number;
  todoState$: Observable<State>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<State>) {
    this.todoState$ = store.pipe(select('todoState'));
  }

  ngOnInit() {
    this.todoId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    this.store.dispatch(loadTodoById({payload: this.todoId}));
  }

  goBackTodoList() {
    this.router.navigate(['todo/list']);
  }
}
