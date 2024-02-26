import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../models/task.model';
import { DataRequestsService } from '../../services/data-requests.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../../components/tasks/task-details/task-details.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrl: './task-lists.component.scss'
})
export class TaskListsComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['title', 'completed', 'options'];
  dataSource = new MatTableDataSource<Task>();
  taskList: Task[] = [];

  constructor(private dataRequestsService: DataRequestsService, public dialog: MatDialog, private router: Router) {

  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void{
    this.paginator._intl.itemsPerPageLabel = "Items";
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    this.dataRequestsService.tasksDataObs.subscribe({
      next: (taskListAnsw) => {
        this.dataSource = new MatTableDataSource(taskListAnsw);
        this.taskList = taskListAnsw;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        //To do Show the error on alert
        console.log("Error has occurred", error);
      }
    })
  }

  openTaskDetailsModal(task:Task ): void {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      data: task,
    });
  }

  toggleCompleted($event: MatSlideToggleChange, task: Task) {
    const toggledTask = this.taskList.find(t => t.title === task.title);

    if(toggledTask) {
      toggledTask.completed = $event.checked;
    }

    this.dataRequestsService.setTasksData(this.taskList);
  }

  deleteTask( task: Task) {
    const newList = this.taskList.filter(t => t.title !== task.title);

    this.dataRequestsService.setTasksData(newList);   
  }

  editTask(task: Task) {

    this.router.navigate([`/dashboard/edit-task/${task.title}`]);
  }


}
