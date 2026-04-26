import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Tarefa } from '../tarefa.model';
import { TaskService } from '../task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  @Output() addedTask = new EventEmitter<Tarefa>();

  isEditMode = false;

  newTask: Partial<Tarefa> = {
    titulo: '',
    descricao: '',
    concluida: false,
    data: undefined
  };

  datePickerValue: Date | null = null;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tarefa | null
  ) {
    if (data) {
      this.isEditMode = true;
      this.newTask = {...data};
      this.datePickerValue = data.data ? this.fromYMD(data.data) : null;
    }
  }

  private toYMD(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  private fromYMD(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  onSubmit(): void {
    const payload: Partial<Tarefa> = {
      ...this.newTask,
      data: this.datePickerValue ? this.toYMD(this.datePickerValue) : ''
    };

    if (this.isEditMode) {
      this.taskService.updateTask(payload as Tarefa).subscribe(updatedTask => {
        this.dialogRef.close(updatedTask);
      });
    } else {
      this.taskService.addTask(payload).subscribe(savedTask => {
        this.addedTask.emit(savedTask);
        this.dialogRef.close(savedTask);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}