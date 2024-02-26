import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {

  task: Task

  constructor(@Inject(MAT_DIALOG_DATA) public data:Task, public dialogRef: MatDialogRef<TaskComponent>) {
    this.task = data;
  }

}
