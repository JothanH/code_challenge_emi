import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { State } from "../../models/state.model";
import { DataRequestsService } from "../../services/data-requests.service";
import { StateHistory, Task } from "../../models/task.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrl: "./task-form.component.scss",
})
export class TaskFormComponent {
  taskForm: FormGroup = this.createForm();
  taskList: Task[] = [];
  stateList: State[] = [];
  noteList: string[] = [];
  noteText = "";

  constructor(
    private fb: FormBuilder,
    private dataRequestsService: DataRequestsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  createForm() {
    return this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      dueDate: ["", Validators.required],
      currentState: ["", Validators.required],
    });
  }

  fetchData() {
    this.dataRequestsService.statesDataObs.subscribe({
      next: (stateListAnsw) => {
        this.stateList = stateListAnsw;
      },
      error: (error) => {
        alert("An error ocurred while trying to fetch the state list");
      },
    });

    this.dataRequestsService.tasksDataObs.subscribe({
      next: (taskListAnsw) => {
        this.taskList = taskListAnsw;
      },
      error: (error) => {
        alert("An error occurred while trying to fetch the task list");
      },
    });
  }

  saveTask() {
    let taskValues = this.taskForm.value;

    const dueDate: Date = taskValues.dueDate;
    const isoDueDateString = dueDate.toISOString().slice(0, 10);

    const currentDate: Date = new Date();
    const isoCurrentDateString = currentDate.toISOString().slice(0, 10);

    const stateRecord: StateHistory = {
      state: taskValues.currentState.name,
      date: isoCurrentDateString,
    };

    const newTask: Task = {
      title: taskValues.title,
      description: taskValues.description,
      completed: false,
      dueDate: isoDueDateString,
      stateHistory: [stateRecord],
      notes: this.noteList,
    };

    this.taskList.push(newTask);
    this.dataRequestsService.setTasksData(this.taskList);

    alert("Task Saved Successfully");

    this.taskForm.reset();
    this.noteList = [];

    this.router.navigate(["dashboard/tasks"]);
  }
}
