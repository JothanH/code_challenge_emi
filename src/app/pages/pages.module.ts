import { NgModule } from "@angular/core";
import { TaskListsComponent } from "./task-lists/task-lists.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { StatesListComponent } from "./states-list/states-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "../components/components.module";
import { MaterialModule } from "../modules/material/material.module";
import { PagesComponent } from "./pages.component";
import { HttpClientModule } from "@angular/common/http";
import { TaskEditFormComponent } from "./task-edit-form/task-edit-form.component";




@NgModule({
    declarations: [
     TaskListsComponent,
     TaskFormComponent,
     TaskEditFormComponent,
     StatesListComponent,
     PagesComponent
    ],
    exports: [
        TaskListsComponent,
        TaskFormComponent,
        TaskEditFormComponent,
        StatesListComponent,
        PagesComponent,
    ],
    imports: [ 
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      MaterialModule,
      ComponentsModule,
      HttpClientModule,
     
    ]
  })
  export class PagesModule { }