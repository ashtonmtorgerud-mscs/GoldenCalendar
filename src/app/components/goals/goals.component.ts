import { NgFor, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-goals',
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent {



  getConnectionString(): string {
    return localStorage.getItem('connectionString') || '';
  }

  saveConnectionString(value: string): void {
    localStorage.setItem('connectionString', value);
  }



}
