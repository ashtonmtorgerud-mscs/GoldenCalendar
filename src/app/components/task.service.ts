import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


export class Task {
  constructor(
    iId: number, iTitle: string, iDescription: string, iDueDate: Date
  ) {
    this.id = iId; this.title = iTitle; this.description = iDescription; this.dueDate = new Date(iDueDate);;
  }
  id = 0;
  title = '';
  description = '';
  dueDate = new Date();
  isCompleted = false;
}


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  constructor(private http: HttpClient) { }

  tasks: Task[] = [new Task(1, 'Graduation', 'The day I graduate', new Date(2025, 4, 16)), new Task(2, 'taskTwo', 'taskOneDesc', new Date())];

  getTasksOfDate(iDate: Date): Task[] {

    let taskList: Task[] = [];


    this.tasks.forEach(task => {
      try {
        if (task.dueDate.toDateString() == iDate.toDateString()) {
          taskList.push(task);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return taskList;
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:5254/api/tasks').pipe(
      map(data => data.map(t => new Task(t.id, t.title, t.description, new Date(t.dueDate))))
    );
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:5254/api/tasks', task);
  }
  getTasksOfDatenew(iDate: Date): Observable<Task[]> {
    return this.http.get<Task[]>(`http://localhost:5254/api/tasks/`).pipe(
      map(data => data.filter(task => new Date(task.dueDate).toDateString() === iDate.toDateString())
        .map(t => new Task(t.id,t.title, t.description, new Date(t.dueDate))))
    );
  }
  getTasksOfMonth(iDate: Date): Observable<Task[]> {
    let year = iDate.getFullYear();
    let month = iDate.getMonth() + 1;
    return this.http.get<Task[]>(`http://localhost:5254/api/tasks/bymonth?year=${year}&month=${month}`).pipe(
      map(data => data.map(t => new Task(t.id, t.title, t.description, new Date(t.dueDate))))
    );
  }
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:5254/api/tasks/${task.id}`, task);
  }
  deleteTask(task: Task): Observable<void> {
    return this.http.delete<void>(`http://localhost:5254/api/tasks/${task.id}`);
  }
  getTaskByTitle(title: string): Observable<Task> {
    return this.http.get<Task>(`http://localhost:5254/api/tasks/${title}`).pipe(
      map(data => new Task(data.id, data.title, data.description, new Date(data.dueDate)))
    );
  }
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:5254/api/tasks/${id}`).pipe(
      map(data => new Task(data.id, data.title, data.description, new Date(data.dueDate)))
    );
  }

}
