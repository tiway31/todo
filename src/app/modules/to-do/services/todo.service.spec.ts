import { TestBed, inject, async } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@app/in-memory-data.service';

describe('TodoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, InMemoryWebApiModule.forRoot(InMemoryDataService, {})],
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
      expect(d.length).toBe(2);
    });
  })));

  it('should be return array of 1 todo', async(inject([TodoService], (service: TodoService) => {
    service.getTodoById(1).subscribe(d => {
      expect(d.length).toBe(1);
    });
  })));

  it('should be add 1 todo', async(inject([TodoService], (service: TodoService) => {
    service.createTodo({ id: 2, title: 'note 3', description: 'description 3', status: 'undone' }).subscribe();
    service.getTodos().subscribe(d => {
      expect(d.length).toBe(3);
    });
  })));

  it('should be update 1 todo', async(inject([TodoService], (service: TodoService) => {
    service.updateTodoById({ id: 2, title: 'update note 3', description: 'update description 3', status: 'done' }).subscribe();
    service.getTodoById(2).subscribe(d => {
      expect(d[0].description).toBe('update description 3');
    });
  })));

  it('should be delete 1 todo', async(inject([TodoService], (service: TodoService) => {
    service.deleteTodoById({ id: 2, title: 'update note 3', description: 'update description 3', status: 'done' }).subscribe();
    service.getTodos().subscribe(d => {
      expect(d.length).toBe(2);
    });
  })));

});
