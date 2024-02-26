import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { DataRequestsService } from '../../services/data-requests.service';
import { of } from 'rxjs';
import { MaterialModule } from '../../modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let dataRequestsService: jasmine.SpyObj<DataRequestsService>;

  beforeEach(async () => {

    dataRequestsService = jasmine.createSpyObj('DataRequestsService', ['fetchData', 'setTasksData']);

    dataRequestsService.statesDataObs = of( [
      {"name": "new"},
      {"name": "active"},
      {"name": "resolved"},
      {"name": "closed"}
    ]);
    dataRequestsService.tasksDataObs = of([
      {
        "title": "Complete Project Proposal",
        "description": "Prepare and submit the project proposal for approval.",
        "dueDate": "2023-12-15",
        "completed": false,
        "stateHistory": [
          {"state": "new", "date": "2023-12-01"},
          {"state": "active", "date": "2023-12-05"}
        ],
        "notes": [
          "Check proposal guidelines",
          "Include budget estimates"
        ]
      },
      {
        "title": "Design Wireframes",
        "description": "Create wireframes for the user interface.",
        "dueDate": "2023-12-20",
        "completed": false,
        "stateHistory": [
          {"state": "new", "date": "2023-12-02"},
          {"state": "active", "date": "2023-12-06"}
        ],
        "notes": [
          "Review design patterns",
          "Seek feedback from the team"
        ]
      }]);

    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                MaterialModule,
                BrowserAnimationsModule,

      ],
      providers: [{ provide: DataRequestsService, useValue: dataRequestsService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;

    

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.taskForm).toBeTruthy();
  });

  it('should create form with the fields: title, description, dueDate, currentState', () => {
    expect(component.taskForm.contains('title')).toBeTruthy();
    expect(component.taskForm.contains('description')).toBeTruthy();
    expect(component.taskForm.contains('dueDate')).toBeTruthy();
    expect(component.taskForm.contains('currentState')).toBeTruthy();    
  });

  it('title should be mandatory', () => {
    const control = component.taskForm.get('title');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  })

  it('description should be mandatory', () => {
    const control = component.taskForm.get('description');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  })

  it('due date should be mandatory', () => {
    const control = component.taskForm.get('dueDate');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  })

  it('currentState should be mandatory', () => {
    const control = component.taskForm.get('dueDate');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  })


  it('should fetch states and tasks on init', () => {
    expect(component.stateList.length).toBeGreaterThan(0);
    expect(component.taskList.length).toBeGreaterThan(0);
  });

  it('should save task', () => {
    const initialTaskListLength = component.taskList.length;
    const initialNoteListLength = component.noteList.length;
    component.taskForm.setValue({
      title: 'Test Task',
      description: 'Test Description',
      dueDate: new Date(),
      currentState: component.stateList[0] 
    });
    component.noteText = 'Test Note';
    component.saveTask();
    expect(component.taskList.length).toBe(initialTaskListLength + 1);
    expect(component.noteList.length).toBe(initialNoteListLength);
  });


});