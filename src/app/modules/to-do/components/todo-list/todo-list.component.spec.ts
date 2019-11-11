import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@app/in-memory-data.service';
import { TodoService } from '@app/modules/to-do/services/todo.service';
import { TodoListComponent } from '@app/modules/to-do/components/todo-list/todo-list.component';
import { todoReducer } from '@app/modules/to-do/state/todo.reducer';
import { TodoEffects } from '@app/modules/to-do/state/todo.effects';
import { Router } from '@angular/router';
import { State } from '../../state/todo.state';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Todo } from '@app/shared/models/todo';
import { ToDoModule } from '@app/modules/to-do/to-do.module';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<State>;
  let todos: Todo[];
  const router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ToDoModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService, {}),
        StoreModule.forRoot({}),
        StoreModule.forFeature('todoState', todoReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([TodoEffects])
      ],
      providers: [
        { provide: Store, useClass: Store },
        { provide: Router, useValue: router },
        TodoService
      ]
    }).compileComponents();
  }));

  beforeEach(async(inject([Store], (testStore: Store<State>) => {
    store = testStore;
    store
      .select('todoState')
      .subscribe(state => {
        todos = state.todos;
      });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  })));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('todo list length should be 2', () => {
    store.select('todoState').subscribe((d: State) => {
      expect(d.todos.length).toBe(2);
    });
  });

  it('every todo should have one state and one title', () => {
    store.select('todoState').subscribe(d => {
      d.todos.map((t: Todo) => {
        expect(t.title).toBeTruthy();
        expect(t.status).toBeTruthy();
      });
    });
  });

  it('should change status done to undone when checkbox is cheched', async(() => {
    fixture.detectChanges();
    const checkbox0 = fixture.debugElement.query(By.css('#chkbx-0-input'));

    store
    .select('todoState')
    .subscribe(state => {
      todos = state.todos;
    });

    fixture.detectChanges();
    expect(todos[0].status).toBe('undone');

    click(checkbox0.nativeElement);

    fixture.detectChanges();
    expect(todos[0].status).toBe('done');

  }));

  it('todo[0] change to  todo[1]', async (() => {
    expect(todos[0].id).toBe(1);
  }));

  it('click edit [0] should be navigate to router detail/0', async (() => {
    const edit0 = fixture.debugElement.query(By.css('#edit-0'));
    click(edit0.nativeElement);
    expect(router.navigate).toHaveBeenCalledWith(['detail', 0]);
  }));

  it('should form valid when title have a value', async (() => {
    const buttonShowForm = fixture.debugElement.query(By.css('#buttonShowForm'));
    click(buttonShowForm.nativeElement);
    fixture.detectChanges();
    component.todoForm.controls.title.setValue('new title with id 2');
    expect(component.todoForm.valid).toBeTruthy();
  }));

  it('should form invalid when title have no value', () => {
    const buttonShowForm = fixture.debugElement.query(By.css('#buttonShowForm'));
    click(buttonShowForm.nativeElement);
    fixture.detectChanges();
    expect(component.todoForm.valid).toBeFalsy();
  });

  it('add one new todo should be valid  ', async (() => {
    const buttonShowForm = fixture.debugElement.query(By.css('#buttonShowForm'));
    click(buttonShowForm.nativeElement);
    fixture.detectChanges();
    component.todoForm.controls.title.setValue('new title with id 2');
    expect(component.todoForm.valid).toBeTruthy();
    const addTodo = fixture.debugElement.query(By.css('#addTodoSubmit'));
    click(addTodo.nativeElement);
    fixture.detectChanges();
  }));


  it('new todo go to todo[0]', async (() => {
    expect(todos[0].title).toBe('new title with id 2');
  }));


  /** Simulate element click. Defaults to mouse left-button click event. */

  const ButtonClickEvents = {
    left: { button: 0 },
    right: { button: 2 }
  };

  function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    if (el instanceof HTMLElement) {
      el.click();
    } else {
      el.triggerEventHandler('click', eventObj);
    }
  }
});
