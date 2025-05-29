import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente.model';
import { baseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesService extends baseService<Paciente> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl+'/Pacientes'); // passa URL da API
  }
 
}