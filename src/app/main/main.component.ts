import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tasks: Task[] = [];
  newTask: string = '';
  btnTrigger: boolean[] = [];

  ngOnInit(){
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks){
      this.tasks= JSON.parse(savedTasks);
    }
  }

  addTask(task: string) {
    if(task!=''){
      this.tasks.push(new Task(false, task, true));
      this.newTask = '';
      this.saveTasks();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  changedRead(index:number){
    this.tasks[index].readonly=false;
    this.btnTrigger[index]=true;
  }

  modifyTask(index:number, text: string){
    this.tasks[index].readonly=!this.tasks[index].readonly;
    this.tasks[index].title=text;
    this.saveTasks();
    this.btnTrigger[index]=!this.btnTrigger[index];
  }

  strike(index: number) {
    this.tasks[index].checked = !this.tasks[index].checked;
    this.saveTasks();
  }

  saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}