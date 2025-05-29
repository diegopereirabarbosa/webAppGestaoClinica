export class Paciente {
  id!: number;
  nome!: string;
  telefone!: string;
  sexo!: string;
  email!: string;
  atendimentos: any[] = [];
}