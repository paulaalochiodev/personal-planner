export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  dataInicio: string;
  dataFim?: string | null;
  incluirHora: boolean;
}