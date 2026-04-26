import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarefa } from '../tarefa.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  @Output() addedTask = new EventEmitter<Tarefa>();

  isEditMode = false;
  includeEndDate = false;
  includeTime = false;

  newTask: Partial<Tarefa> = {
    titulo: '',
    descricao: '',
    concluida: false,
    dataInicio: '',
    dataFim: null,
    incluirHora: false
  };

  startDate: Date | null = null;
  endDate: Date | null = null;
  startTime = '09:00';
  endTime = '09:00';

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tarefa | null
  ) {
    if (data) {
      this.isEditMode = true;
      this.newTask = { ...data };
      this.includeTime = !!data.incluirHora;
      this.includeEndDate = !!data.dataFim;

      const start = this.fromApiDateTime(data.dataInicio);
      this.startDate = start.date;
      this.startTime = start.time;

      if (data.dataFim) {
        const end = this.fromApiDateTime(data.dataFim);
        this.endDate = end.date;
        this.endTime = end.time;
      }
    }
  }

  private toYMD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private buildDateTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':');
    return `${this.toYMD(date)}T${hours}:${minutes}:00`;
  }

  private fromApiDateTime(value: string): { date: Date; time: string } {
    const [datePart, timePart = '00:00:00'] = value.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours = '00', minutes = '00'] = timePart.split(':');

    return {
      date: new Date(year, month - 1, day),
      time: `${hours}:${minutes}`
    };
  }

  onEndDateToggle(enabled: boolean): void {
    this.includeEndDate = enabled;

    if (enabled && this.startDate && !this.endDate) {
      this.endDate = new Date(this.startDate);
      this.endTime = this.startTime;
    }

    if (!enabled) {
      this.endDate = null;
      this.endTime = '09:00';
    }
  }

  onTimeToggle(enabled: boolean): void {
    this.includeTime = enabled;

    if (!enabled) {
      this.startTime = '09:00';
      this.endTime = '09:00';
    }
  }

  onSubmit(): void {
    if (!this.startDate) {
      return;
    }

    if (this.includeEndDate && !this.endDate) {
      return;
    }

    const startDateTime = this.buildDateTime(
      this.startDate,
      this.includeTime ? this.startTime : '00:00'
    );

    const endDateTime = this.includeEndDate && this.endDate
      ? this.buildDateTime(this.endDate, this.includeTime ? this.endTime : '00:00')
      : null;

    const payload: Partial<Tarefa> = {
      ...this.newTask,
      dataInicio: startDateTime,
      dataFim: endDateTime,
      incluirHora: this.includeTime
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