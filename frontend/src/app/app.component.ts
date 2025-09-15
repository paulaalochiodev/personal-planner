import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Tarefa } from './tarefa.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  tarefas: Tarefa[] = [];

  constructor(
    private taskService: TaskService, 
    public dialog: MatDialog) 
    
    {}

  ngOnInit(): void {
    this.taskService.getTarefas().subscribe(dadosDaApi => {
      this.tarefas = dadosDaApi;
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O dialog foi fechado. Resultado:', result);
      if (result) {
        this.adicionarTarefaNaLista(result);
      }
    });
  }

  adicionarTarefaNaLista(novaTarefa: Tarefa) {
  this.tarefas.push(novaTarefa);
  }

  toggleConcluida(tarefa: Tarefa): void {
    tarefa.concluida = !tarefa.concluida;

    this.taskService.updateTask(tarefa).subscribe({
      next: (tarefaAtualizada) => {
        console.log('Tarefa atualizada com sucesso!', tarefaAtualizada);
      },
      error: (err) => {
        console.error('Erro ao atualizar tarefa:', err);
        tarefa.concluida = !tarefa.concluida;
      }
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        console.log('Tarefa deletada com sucesso!');
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
      },
      error: (err) => {
        console.error('Erro ao deletar tarefa:', err);
      }
    });
  }
}