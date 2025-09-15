import { Component, EventEmitter, Output } from '@angular/core';
import { Tarefa } from '../tarefa.model';
import { TaskService } from '../task.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  @Output() addedTask = new EventEmitter<Tarefa>();

  newTask: Partial<Tarefa> = {
    titulo: '',
    descricao: '',
    concluida: false
  };

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AddTaskComponent>
  ) { }

  onSubmit(): void {
    this.taskService.addTask(this.newTask).subscribe(savedTask => {
      this.addedTask.emit(savedTask);

      this.dialogRef.close(savedTask);
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
