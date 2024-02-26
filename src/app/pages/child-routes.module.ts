import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskListsComponent } from "./task-lists/task-lists.component";
import { StatesListComponent } from "./states-list/states-list.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskEditFormComponent } from "./task-edit-form/task-edit-form.component";

const childRoutes: Routes = [
  {
    path: "",
    redirectTo: "tasks",
    pathMatch: "full",
  },
  {
    path: "tasks",
    component: TaskListsComponent,
  },
  {
    path: "states",
    component: StatesListComponent,
  },
  {
    path: "add-task",
    component: TaskFormComponent,
  },
  {
    path: "edit-task/:title",
    component: TaskEditFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
