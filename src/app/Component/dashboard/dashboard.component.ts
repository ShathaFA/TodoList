import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';
  isModalVisible: boolean = false; // Track modal visibility

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe({
      next: (res) => {
        this.taskArr = res;
      },
      error: () => {
        alert("Unable to get list of tasks");
      }
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next: () => {
        this.getAllTask(); // Refresh the task list
        this.addTaskValue = '';
      },
      error: (err) => {
        alert(err);
      }
    });
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: () => {
        this.getAllTask(); // Refresh the task list
        this.closeModal(); // Close modal after edit
      },
      error: () => {
        alert("Failed to update task");
      }
    });
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe({
      next: () => {
        this.getAllTask(); // Refresh the task list
      },
      error: () => {
        alert("Failed to delete task");
      }
    });
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
    this.isModalVisible = true; // Show the modal
  }

  closeModal() {
    this.isModalVisible = false; // Hide the modal
  }
}
