import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataRequestsService } from "../../services/data-requests.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StateHistory, Task } from "../../models/task.model";
import { State } from "../../models/state.model";

@Component({
  selector: "app-task-edit-form",
  templateUrl: "./task-edit-form.component.html",
  styleUrl: "./task-edit-form.component.scss",
})
export class TaskEditFormComponent {
  previousTaskTitle: string = "";
  taskForm: FormGroup = this.createForm();
  noteList: string[] = [];
  stateList: State[] = [];
  noteText = "";
  taskList: Task[] = [];
  currentTask: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataRequestService: DataRequestsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataRequestService.statesDataObs.subscribe({
      next: (stateListAnsw) => {
        this.stateList = stateListAnsw;
      },
      error: (error) => {
        alert("An error ocurred while trying to fetch the state list");
      },
    });

    this.previousTaskTitle = this.route.snapshot.params["title"];

    this.dataRequestService.tasksDataObs.subscribe({
      next: (taskListAnsw) => {
        this.taskList = taskListAnsw;
        this.currentTask = taskListAnsw.find(
          (t) => t.title === this.previousTaskTitle
        );
        if (this.currentTask) {
          this.setDataToForm(this.currentTask);
        }
      },
      error: (error) => {
        alert("Error has ocurred fetching the task to edit");
      },
    });
  }

  createForm() {
    return this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      dueDate: ["", Validators.required],
      currentState: ["", Validators.required],
    });
  }

  setDataToForm(currentTask: Task) {
    const lastSTate = currentTask.stateHistory.reduce((prev, current) => {
      const prevDate = new Date(prev.date);
      const currentDate = new Date(current.date);
      return prevDate > currentDate ? prev : current;
    });

    this.taskForm?.setValue({
      title: this.previousTaskTitle,
      description: currentTask.description,
      dueDate: currentTask.dueDate,
      currentState: lastSTate,
    });

    this.noteList = currentTask.notes;
  }

  saveTask() {
    try {
      let taskValues = this.taskForm.value;
      let dueDate;

      if (taskValues.dueDate! instanceof Date) {
        dueDate = taskValues.dueDate;
      } else {
        dueDate = new Date(taskValues.dueDate);
      }

      const isoDueDateString = dueDate.toISOString().slice(0, 10);

      const currentDate: Date = new Date();
      const isoCurrentDateString = currentDate.toISOString().slice(0, 10);

      const stateRecord: StateHistory = {
        state: taskValues.currentState.name,
        date: isoCurrentDateString,
      };
      if (this.currentTask) {
        this.currentTask.title = taskValues.title;
        this.currentTask.description = taskValues.description;
        this.currentTask.completed = false;
        this.currentTask.dueDate = isoDueDateString;
        this.currentTask.stateHistory.push(stateRecord);
        this.currentTask.notes = this.noteList;

        let newTaskList = this.taskList.filter(
          (taskList) => taskList.title !== this.previousTaskTitle
        );

        newTaskList.push(this.currentTask);

        this.dataRequestService.setTasksData(newTaskList);

        alert("Task Saved Successfully");

        this.taskForm.reset();
        this.noteList = [];

        this.router.navigate(["dashboard/tasks"]);
      } else {
        alert("An error ocurred saving the task");
      }
    } catch (error) {
      alert("An error ocurred saving the task");
    }
  }
}
