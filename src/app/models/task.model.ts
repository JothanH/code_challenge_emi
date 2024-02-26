export interface Task {
  title: string;
  description: string;
  dueDate: Date | string ;
  completed: boolean;
  stateHistory: StateHistory[];
  notes: string[];
}

export interface StateHistory {
  state: string;
  date: Date | string;
}
