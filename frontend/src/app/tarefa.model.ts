export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  data: string;
  incluirHorario?: boolean;
  incluirFim?: boolean;
  horaInicio?: string;
  horaFim?: string;
  startDateTime?: string;
  endDateTime?: string;       
}