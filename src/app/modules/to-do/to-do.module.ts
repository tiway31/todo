import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ToDoRoutingModule } from './to-do-routing.module';
import { MaterialModule } from '@app/shared/material.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@NgModule({
  declarations: [TodoListComponent, TruncatePipe, TodoDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToDoRoutingModule,
    MaterialModule
  ]
})
export class ToDoModule { }
