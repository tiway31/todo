import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@app/in-memory-data.service';
import { TodoService } from '@app/modules/to-do/services/todo.service';
import { TodoDetailComponent } from '@app/modules/to-do/components/todo-detail/todo-detail.component';
import { TodoListComponent } from '@app/modules/to-do/components/todo-list/todo-list.component';
import { todoReducer } from '@app/modules/to-do/state/todo.reducer';
import { loadTodoById } from '@app/modules/to-do/state/todo.actions';
import { TodoEffects } from '@app/modules/to-do/state/todo.effects';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { State } from '@app/modules/to-do/state/todo.state';
import { ToDoModule } from '@app/modules/to-do/to-do.module';


describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ToDoModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([{ path: 'detail', component: TodoListComponent }, { path: 'list', component: TodoListComponent }]),
        InMemoryWebApiModule.forRoot(InMemoryDataService, {}),
        StoreModule.forRoot({}),
        StoreModule.forFeature('todoState', todoReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([TodoEffects])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: 1 }) } } },
        { provide: Store, useClass: Store },
        TodoService
      ]
    }).compileComponents();
  }));

  beforeEach(async(inject([Store], (testStore: Store<State>) => {
    store = testStore;
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    store.dispatch(loadTodoById({ payload: 1 }));
    fixture.detectChanges();
  })));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('todos length should be 1', () => {
    store.select('todoState').subscribe(d => {
      expect(d.todos.length).toBe(1);
    });
  });

  it('title todo should contain note2', () => {
    store.select('todoState').subscribe(d => {
      expect(d.todos[0].title).toContain('note 2');
    });
  });

});
