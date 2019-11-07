import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MaterialModule } from '@app/shared/material.module';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoService } from '@app/modules/to-do/services/todo.service';
import { TruncatePipe } from '@app/modules/to-do/pipes/truncate.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodoDetailComponent } from '@app/modules/to-do/components/todo-detail/todo-detail.component';
import { TodoListComponent } from '@app/modules/to-do/components/todo-list/todo-list.component';
import { todoReducer } from '@app/modules/to-do/state/todo.reducer';
import { TodoEffects } from '@app/modules/to-do/state/todo.effects';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TruncatePipe, TodoDetailComponent, TodoListComponent],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule, FormsModule,
        RouterTestingModule.withRoutes([{ path: 'detail', component: TodoListComponent }, { path: 'list', component: TodoListComponent }]),
        StoreModule.forRoot({}),
        StoreModule.forFeature('todoState', todoReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([TodoEffects])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: 1 }) } } },
        TodoService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be have todo == 1', () => {
    expect(component.todoId).toBe(1);
  });

  it('should contain "Todo detail"', () => {
    const compiled = fixture.debugElement.nativeElement;
    const title = compiled.querySelector('#todoDetailTitle');
    expect(title.textContent).toContain('Todo detail');
  });
});
