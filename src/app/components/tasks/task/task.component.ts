import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input()
  inputData!: Task;
  currentState: string | null = null ;

  constructor() {

  }

  ngOnInit(): void {
    this.currentState = this.getLastState(this.inputData);
  }

  getLastState(task: Task): string | null {
    if (!task.stateHistory || task.stateHistory.length === 0 ) {
      return null;
    }

    const lastSTate = task.stateHistory.reduce((prev, current) => {
      const prevDate = new Date(prev.date);
      const currentDate = new Date(current.date);
      return prevDate > currentDate ? prev : current;
    })

    return lastSTate.state;
  }

}
