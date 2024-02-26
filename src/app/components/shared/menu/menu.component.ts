import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(private router: Router) {}

  redirectToTasks() {
    this.router.navigate(['/dashboard/tasks']);
  }

  redirectToStates() {
    this.router.navigate(['/dashboard/states']);
  }

}
