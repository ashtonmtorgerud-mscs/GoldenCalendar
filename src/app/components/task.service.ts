import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


class barrier{
  //I genuinely have no clue why this empty class sitting here fixes the code, but it does so...
}

export class Task{
  constructor(
    iTitle:string, iDescription:string, iDueDate:Date
  ) {
    this.title = iTitle; this.description = iDescription; this.dueDate = new Date(iDueDate);;
  }
  title = '';
  description = '';
  dueDate = new Date();

  completed = false;
}

export class TaskService {
  constructor ( private http: HttpClient ) {  }


  public static prefColor = 'blue';

  static tasks:Task[] = [new Task('Graduation', 'The day I graduate', new Date(2025, 4, 16)), new Task('taskTwo', 'taskOneDesc', new Date())];

  static getTasksOfDate(iDate:Date): Task[]{
    
    let taskList: Task[] = [];


    TaskService.tasks.forEach(task => {
      try {
        if (task.dueDate.toDateString() == iDate.toDateString()){
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
      map(data => data.map(t => new Task(t.title, t.description, new Date(t.dueDate))))
    );
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:5254/api/tasks', task);
  }
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:5254/api/tasks/${task.title}`, task);
  }  
  deleteTask(task: Task): Observable<void> {
    return this.http.delete<void>(`http://localhost:5254/api/tasks/${task.title}`);
  }
  getTaskByTitle(title: string): Observable<Task> {
    return this.http.get<Task>(`http://localhost:5254/api/tasks/${title}`).pipe(
      map(data => new Task(data.title, data.description, new Date(data.dueDate)))
    );
  }
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:5254/api/tasks/${id}`).pipe(
      map(data => new Task(data.title, data.description, new Date(data.dueDate)))
    );
  }

}
