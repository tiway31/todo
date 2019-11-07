import { TestBed, inject, async } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@app/in-memory-data.service';

describe('TodoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, InMemoryWebApiModule.forRoot(InMemoryDataService, {}),],
      providers: [TodoService]
    });
  }
  );

  it('should be created', inject([TodoService], (service: TodoService) => {
    // const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  }));

  it('should be return 3 todos', async(inject([TodoService], (service: TodoService) => {
    service.getTodos().subscribe(d => {
      expect(d.length).toBe(3);
    });
  })));

  it('should be return array of 1 todo', async(inject([TodoService], (service: TodoService) => {
    service.getTodoById(1).subscribe(d => {
      expect(d.length).toBe(1);
    });
  })));

  it('should be add 1 todo', async(inject([TodoService], (service: TodoService) => {
    service.createTodo({ id: 3, title: 'note 4', description: 'description 4', status: 'undone' }).subscribe();
    service.getTodos().subscribe(d => {
      expect(d.length).toBe(4);
    });
  })));

  it('should be update 1 todo', async(inject([TodoService], (service: TodoService) => {
    service.updateTodoById({ id: 3, title: 'update note 4', description: 'update description 4', status: 'done' }).subscribe();
    service.getTodoById(3).subscribe(d => {
      expect(d[0].description).toBe('update description 4');
    });
  })));

  it('should be delete 1 todo', async(inject([TodoService], (service: TodoService) => {
    service.deleteTodoById(3).subscribe();
    service.getTodos().subscribe(d => {
      expect(d.length).toBe(3);
    });
  })));

});