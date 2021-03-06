import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '@app/shared/models/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb(){
    const todos: Todo[] = [
      {
        id: 0,
        title: 'une tres longue note qui va sortir du cadre donc il faut faire attention',
        description: 'description 1',
        status: 'undone'},
      {id: 1, title: 'note 2', description: 'description 2', status: 'done'}
    ];
    return {todos};
  }


  constructor() { }
}
