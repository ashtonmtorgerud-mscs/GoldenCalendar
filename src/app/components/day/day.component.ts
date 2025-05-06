import { NgFor, NgIf, } from '@angular/common';
import { Component, Input, NgModule, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service';


@Component({
  selector: 'app-day',
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})

export class DayComponent {

  constructor( private route: ActivatedRoute, private taskService: TaskService ){}


  //Tasks Stuff
  
  myTasks: Task[] = [];
  newTaskName = '';
  newTaskDesc = '';
  newTaskDate = new Date();
  selectedTask: Task = new Task(0, "", "", new Date);

  // ///Class Names
  modalVisibility = false;
  createTaskModalPlate = false;
  editTaskModalPlate = false;
  deleteTaskModalPlate = false;

  // //Dates Stuff
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

      

      this.loadTasks();

    });
  }

  private loadTasks() {
    this.dayDate = new Date(this.yearParam, this.monthParam, this.dayParam);
    this.taskService.getTasksOfDatenew(this.dayDate).subscribe({
      next: (tasks: Task[]) => {
        this.myTasks = tasks;

        if (this.myTasks.length > 0){
          this.selectedTask = this.myTasks[0];
        } else {
          this.selectedTask = new Task(0, '', '', new Date());
        }
      },
      error: (err) => {
        console.error('💥 Error fetching tasks:', err);
      }
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


  AddNamedTask(): void {
    // this.newTaskDate = new Date (this.dayDate);
    // this.newTaskDate.setHours(0, 0, 0, 0);

    this.selectedTask.dueDate = new Date(this.newTaskDate);
    this.selectedTask.dueDate.setHours(0, 0, 0, 0);

    let newTask = new Task(0, this.newTaskName, this.newTaskDesc, this.newTaskDate);
    console.log(newTask);

    this.taskService.addTask(newTask).subscribe({
      next: () => {
        console.log('Task added successfully!', newTask);
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error adding task:', err);
      }
    });


    this.newTaskName = '';
    this.newTaskDesc = '';
    
  }


  toggleModal(iPanel:string): void {
      this.modalVisibility = true;
    if (iPanel == 'Create'){
      this.createTaskModalPlate = true;
      this.deleteTaskModalPlate = false;
      this.editTaskModalPlate = false;
    } else if (iPanel == 'Delete'){
      this.createTaskModalPlate = false;
      this.deleteTaskModalPlate = true;
      this.editTaskModalPlate = false;
    } else if (iPanel == 'Edit'){
      this.newTaskName = this.selectedTask.title;
      this.newTaskDesc = this.selectedTask.description;
      this.createTaskModalPlate = false;
      this.deleteTaskModalPlate = false;
      this.editTaskModalPlate = true;
    }
  }

  closeModal(): void {
    this.modalVisibility = false;
    this.createTaskModalPlate = false;
    this.deleteTaskModalPlate = false;
    this.editTaskModalPlate = false;
  }


  updateTask(){
    this.selectedTask.title = this.newTaskName;
    this.selectedTask.description = this.newTaskDesc;
    this.selectedTask.dueDate = new Date(this.newTaskDate);
    // this.selectedTask.dueDate.setHours(this.newTaskTime.getHours(), this.newTaskTime.getMinutes(), 0, 0);
    this.taskService.updateTask(this.selectedTask).subscribe({
      next: () => {
        console.log('Task Updated successfully!', this.selectedTask);
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error deleting task:', err);
        console.log(this.selectedTask);
      }
    });
  }


  deleteTask(iTask:Task){
    
    this.taskService.deleteTask(iTask).subscribe({
      next: () => {
        console.log('Task deleted successfully!');
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      }
    });
  }
}


