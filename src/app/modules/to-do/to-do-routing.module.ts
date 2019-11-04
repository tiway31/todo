import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: TodoListComponent},
  {path: 'detail/:id', component: TodoDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoRoutingModule { }
