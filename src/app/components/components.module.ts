import { NgModule } from "@angular/core";
import { MenuComponent } from "./shared/menu/menu.component";
import { TaskDetailsComponent } from "./tasks/task-details/task-details.component";
import { TaskComponent } from "./tasks/task/task.component";
import { MaterialModule } from "../modules/material/material.module";



@NgModule({
    declarations: [
      MenuComponent,
      TaskDetailsComponent,
      TaskComponent,
    ],
    exports: [
      MenuComponent,
      TaskDetailsComponent,
      TaskComponent,
    ],
    imports: [
      MaterialModule
    ]
  })
  export class ComponentsModule { }