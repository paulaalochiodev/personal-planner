import { Component, EventEmitter, Output } from '@angular/core';
import { Tarefa } from '../tarefa.model';
import { TaskService } from '../task.service';

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

  constructor(private taskService: TaskService) { }

  onSubmit(): void {
    this.taskService.addTask(this.newTask).subscribe(savedTask => {
      this.addedTask.emit(savedTask);

      this.newTask.titulo = '';
      this.newTask.descricao = '';
    })
  }
}
