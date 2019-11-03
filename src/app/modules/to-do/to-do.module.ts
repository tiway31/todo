import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@NgModule({
  declarations: [TodoListComponent],
  imports: [
    CommonModule,
    ToDoRoutingModule
  ]
})
export class ToDoModule { }
