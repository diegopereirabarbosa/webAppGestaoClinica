import { Atendimento } from './atendimento.model';

export interface Triagem {
  id: number;
  atendimentoId: number;
  sintomas: string;
  pressaoArterial: string;
  peso: number;
  altura: number;
  especialidadeId: number;
  atendimento: Atendimento;
}