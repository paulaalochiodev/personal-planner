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
    concluida: false,
    data: undefined
  };

  // Campos para datepicker simples
  datePickerValue: Date | null = null;

  // Flags
  includeRange = false;
  includeTime = false;
  includeEndTime = false;

  // Datetimes (Date objetos retornados do datetime picker)
  startDateTime: Date | null = null;
  endDateTime: Date | null = null;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AddTaskComponent>
  ) {}

  private toYMD(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  // Converte Date -> string combinada YYYY-MM-DDTHH:mm:00
  private toLocalDateTimeString(d: Date): string {
    const ymd = this.toYMD(d);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${ymd}T${hh}:${mm}:00`;
  }

  onSubmit(): void {
    const payload: Partial<Tarefa> = { ...this.newTask };

    // Caso usuário tenha usado datepicker simples sem horário
    if (!this.includeTime && this.datePickerValue) {
      payload.data = this.toYMD(this.datePickerValue);
    }

    // Caso tenha usado datetime picker
    if (this.includeTime && this.startDateTime) {
      const startStr = this.toLocalDateTimeString(this.startDateTime);
      payload.data = startStr; // Mantém compatibilidade usando campo "data" com datetime
      payload.startDateTime = startStr;

      if (this.includeRange && this.endDateTime) {
        // Garantir que end >= start
        if (this.endDateTime.getTime() < this.startDateTime.getTime()) {
          // Ajusta ou poderia exibir erro
          this.endDateTime = this.startDateTime;
        }
        const endStr = this.toLocalDateTimeString(this.endDateTime);
        payload.endDateTime = endStr;
      } else {
        delete payload.endDateTime;
      }
    }

    this.taskService.addTask(payload).subscribe(savedTask => {
      this.addedTask.emit(savedTask);
      this.dialogRef.close(savedTask);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}