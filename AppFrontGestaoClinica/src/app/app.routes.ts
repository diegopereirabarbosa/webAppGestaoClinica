import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListarComponent } from './pacientes/listar/listar.component';
import { AuthGuard } from './guards/auth.gurard';
import { CadastrarComponent } from './pacientes/cadastrar/cadastrar.component';
import { ListarAtendimentoComponent } from './atendimento/listar-atendimentos/listar-atendimentos.component';
import { CadastrarAtendimentoComponent } from './atendimento/cadastrar-atendimento/cadastrar-atendimento.component';
import { CadastrarTriagemComponent } from './triagem/cadastrar-triagem/cadastrar-triagem.component';
import { ListarTriagemComponent } from './triagem/listar-triagem/listar-triagem.component';

export const routes: Routes = [
      {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'pacientes/listar',
    component: ListarComponent,
    //canActivate: [AuthGuard] 
  },
  {
    path: 'pacientes/cadastrar',
    component: CadastrarComponent,
    //canActivate: [AuthGuard] 
  },
  {
    path: 'atendimentos/cadastrar',
    component: CadastrarAtendimentoComponent,
    //canActivate: [AuthGuard] 
  },
  {
    path: 'atendimentos/listar',
    component: ListarAtendimentoComponent,
    //canActivate: [AuthGuard] 
  },
    {
    path: 'triagens/cadastrar',
    component: CadastrarTriagemComponent,
    //canActivate: [AuthGuard] 
  },
  {
    path: 'triagens/listar',
    component: ListarTriagemComponent,
    //canActivate: [AuthGuard] 
  },
//   {
//     path: '',
//     redirectTo: '/tarefas',
//     pathMatch: 'full'
//   },
//   {
//     path: '**',
//     redirectTo: '/tarefas' 
//   }
];
