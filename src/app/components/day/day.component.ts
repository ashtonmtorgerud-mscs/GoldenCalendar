import { NgFor, NgIf, } from '@angular/common';
import { Component, NgModule, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import e from 'express';
import { title } from 'node:process';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-day',
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})

export class DayComponent {
[x: string]: any;

  constructor( private route: ActivatedRoute, private taskService: TaskService ){}



  //Tasks Stuff
  myTasks: Task[] = [];
  newTaskName = '';
  newTaskDesc = '';
  newTaskDate = new Date();
  selectedTask: Task = new Task("", "", new Date);

  ///Class Names
  modalVisibility = 'hidden';
  createTaskModalPlate = 'hidden';
  deleteTaskModalPlate = 'hiddeen';

  //Dates Stuff
  dayParam:number = 0;
  monthParam:number = 0;
  yearParam:number = 0;
  weekShort: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  monthShort: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  dayDate = new Date();


  ngOnInit(){
    this.route.params.subscribe( params => {
      let todayBackup = new Date();

      // Get the Day parameter
      if (params['day'] != undefined) {
        this.dayParam = params['day'];
      } else {
        this.dayParam = todayBackup.getDate();
      }

      // Get the Month parameter
      if (params['month'] != undefined){
        this.monthParam = params['month'];
      } else {
        this.monthParam = todayBackup.getMonth();
      }

      // Get the Day parameter
      if (params['year'] != undefined ){
        this.yearParam = params['year'];
      } else {
        this.yearParam = todayBackup.getFullYear();
      }


      this.dayDate = new Date(this.yearParam, this.monthParam, this.dayParam);
      this.myTasks = TaskService.getTasksOfDate(this.dayDate);
      this.selectedTask = this.myTasks[0];
    });

    

  }

  GetMonthEnder(day:number): string{
    if (day == 1 || day == 11 || day == 21 || day == 31){
      return 'st';
    } else if (day == 2 || day == 12 || day == 22){
      return 'nd';
    } else{
      return 'th';
    }
    
  }
  
  AddTask(): void {
    let newTask = new Task('TaskClone', 'This is an auto Cloned Task', new Date(2025, 2, 0));
    TaskService.tasks.push(newTask);
    this.myTasks = TaskService.getTasksOfDate(this.dayDate);

  }


  AddNamedTask(iTitle:string): void {
    this.newTaskDate = new Date (this.newTaskDate);
    this.newTaskDate.setDate(this.newTaskDate.getDate() + 1);
    this.newTaskDate.setHours(0, 0, 0, 0);
    
    let newTask = new Task(this.newTaskName, this.newTaskDesc, this.newTaskDate);
    console.log(newTask);
    TaskService.tasks.push(newTask);
    this.myTasks = TaskService.getTasksOfDate(this.dayDate);

  }


  toggleModal(iPanel:string): void {
    if (this.modalVisibility == 'hidden'){
      this.modalVisibility = ''
    } else {
      this.modalVisibility = 'hidden';
    }
    if (iPanel == 'Create'){
      this.createTaskModalPlate = '';
      this.deleteTaskModalPlate = 'hidden';
    } else if (iPanel == 'Delete'){
      this.createTaskModalPlate = 'hidden';
      this.deleteTaskModalPlate = '';
    }
  }


  deleteTask(iTask:Task){
    let tempTasks: Task[] = [];
    TaskService.tasks.forEach(task => {
      if (iTask != task){
        tempTasks.push(task);
      }
    });
    TaskService.tasks = tempTasks;
    if (TaskService.getTasksOfDate(this.dayDate).length > 0){
      this.selectedTask = this.myTasks[0];
    } else {
      this.selectedTask = new Task('No Tasks', '', new Date());
    }
    this.myTasks = TaskService.getTasksOfDate(this.dayDate);
  }

}


