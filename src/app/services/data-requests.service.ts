import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { State } from "../models/state.model";
import { HttpClient } from "@angular/common/http";
import { convertData } from "./db-utils";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataRequestsService {
  constructor(private http: HttpClient) {}

  localJSonURL = "assets/data/db.json";

  private tasksDataSubject = new BehaviorSubject<any>(null);
  private statesDataSubject = new BehaviorSubject<any>(null);
  tasksDataObs: Observable<Task[]> = this.tasksDataSubject.asObservable();
  statesDataObs: Observable<State[]> = this.statesDataSubject.asObservable();

  setInitialDataFromLocalJSon() {
    this.http.get(this.localJSonURL).subscribe({
      next: (data: any) => {
        const initialTasks = convertData<Task>(data.tasks);
        const initialStates = convertData<State>(data.states);

        this.tasksDataSubject.next(initialTasks);
        this.statesDataSubject.next(initialStates)

        sessionStorage.setItem('emiJsonData', JSON.stringify({
          tasks: initialTasks,
          states: initialStates,
        }))
      },
      error: (error) => {
        alert('An error has occurred while obtaining data from the db.json file');
      },
    });
  }

  fetchData(): void {
    const emiJsonData = sessionStorage.getItem('emiJsonData');

    if(emiJsonData) {  //Load the data session from the session storage
      this.tasksDataSubject.next(JSON.parse(emiJsonData).tasks);
      this.statesDataSubject.next(JSON.parse(emiJsonData).states);
    } else {
      this.setInitialDataFromLocalJSon();
    }

  }

  setTasksData(tasks: Task[]): void {
    this.tasksDataSubject.next(tasks);
    const emiJsonDataString = sessionStorage.getItem('emiJsonData');

    if(emiJsonDataString) {
      const emiJsonData = JSON.parse(emiJsonDataString);
      emiJsonData.tasks = tasks;
      sessionStorage.setItem('emiJsonData', JSON.stringify(emiJsonData))
    }


  }


  getTasksData(): Observable<Task[]> {
    return this.tasksDataObs;
  }


}
