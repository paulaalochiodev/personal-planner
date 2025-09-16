import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskService } from '../../task.service';
import { Tarefa } from '../../tarefa.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: { 
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    events: []
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTarefas().subscribe(tarefas => {
      this.loadEvents(tarefas);
    });
  }

  loadEvents(tarefas: Tarefa[]): void {
    const eventosFormatados = tarefas.map(tarefa => ({
      title: tarefa.titulo,
      date: tarefa.data,
      backgroundColor: tarefa.concluida ? '#3788D8' : '#B3544F',
      borderColor: tarefa.concluida ? '#3788D8' : '#B3544F'
    }));

    this.calendarOptions.events = eventosFormatados;
  }

}
