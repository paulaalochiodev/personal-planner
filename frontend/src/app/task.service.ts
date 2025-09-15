import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from './tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/api/tarefas';

  constructor(private http: HttpClient) { }

getTarefas(): Observable<Tarefa[]> {
  return this.http.get<Tarefa[]>(this.apiUrl);
}

addTask(tarefa: Partial<Tarefa>): Observable<Tarefa> {
  return this.http.post<Tarefa>(this.apiUrl, tarefa);
} 
}