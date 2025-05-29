import { environment } from '../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente.model';
import { baseService } from './base.service';
import { Atendimento } from '../models/atendimento.model';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService extends baseService<Atendimento> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl+'/Atendimentos'); 
  }
 
}