import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Tarefa } from './tarefa.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  tarefas: Tarefa[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTarefas().subscribe(dadosDaApi => {
      console.log('Dados recebidos da API:', dadosDaApi);
      this.tarefas = dadosDaApi;
    });
  }

  adicionarTarefaNaLista(novaTarefa: Tarefa) {
  this.tarefas.push(novaTarefa);
}
}