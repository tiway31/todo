import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { TodoListComponent } from '@app/modules/to-do/components/todo-list/todo-list.component';
import { TodoDetailComponent } from '@app/modules/to-do/components/todo-detail/todo-detail.component';

// {path: 'todo', loadChildren: () => import('./modules/to-do/to-do.module').then(m => m.ToDoModule)},

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: TodoListComponent},
  {path: 'detail/:id', component: TodoDetailComponent},
  {path: '**', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
