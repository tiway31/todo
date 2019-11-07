import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from '@app/modules/to-do/state/todo.effects';
import { todoReducer } from '@app/modules/to-do/state/todo.reducer';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
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
    StoreModule.forFeature('todoState',  todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    MaterialModule
  ]
})
export class ToDoModule { }
