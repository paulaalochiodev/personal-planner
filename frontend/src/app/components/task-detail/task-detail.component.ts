import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from 'src/app/tarefa.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public tarefa: Tarefa) {}

  private parseDateTime(value: string): { date: string; time: string } {
    const [datePart, timePart = '00:00:00'] = value.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}`
    };
  }

  formatarPeriodo(): string {
    const inicio = this.parseDateTime(this.tarefa.dataInicio);

    if (!this.tarefa.dataFim) {
      return this.tarefa.incluirHora
        ? `${inicio.date} às ${inicio.time}`
        : inicio.date;
    }

    const fim = this.parseDateTime(this.tarefa.dataFim);

    if (this.tarefa.incluirHora) {
      return `${inicio.date} às ${inicio.time} -> ${fim.date} às ${fim.time}`;
    }

    return `${inicio.date} -> ${fim.date}`;
  }
}

