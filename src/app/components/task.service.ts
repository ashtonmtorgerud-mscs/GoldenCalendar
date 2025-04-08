import { Injectable } from '@angular/core';

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
    this.title = iTitle; this.description = iDescription; this.dueDate = new Date(iDueDate);
  }
  title = '';
  description = 'This is the task description';
  dueDate = new Date();


  printer(){
    console.log('printed');
  }
}

export class TaskService {
  constructor() { }

  static tasks:Task[] = [new Task('taskOne', 'taskOneDescription', new Date(2025, 3, 13)), new Task('taskTwo', 'taskOneDesc', new Date())];

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


}
