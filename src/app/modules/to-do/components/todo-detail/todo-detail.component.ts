import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '@app/shared/models/todo';

@Component({
  selector: 'ads-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  todoId: string;
  curTodo: Todo;

  constructor(private router: Router,private todoService: TodoService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.todoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.todoService.getTodoById(this.todoId).subscribe(
      todo => {
        this.curTodo = todo;
      }
    )
  }

  goBackTodoList(){
    this.router.navigate(['todo/list']);
  }
}
