import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/paciente.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css',
  imports: [CommonModule,
    HttpClientModule,
    MatCardModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatProgressBarModule],
  providers: [PacientesService]
})
export class CadastrarComponent implements OnInit {
  formCadastro!: FormGroup;
  carregando: boolean = false;
  constructor(private fb: FormBuilder, private pacientesService: PacientesService) { }
  ngOnInit(): void {
    this.formCadastro = this.fb.group({
      nome: [null, Validators.required],
      telefone: ["", Validators.required],
      sexo: ["", Validators.required],
      email: ["", Validators.required]
    })
  }

  onSubmit() {
    if (this.formCadastro.valid) {
      this.carregando = true;
      const novoPaciente: Paciente = this.formCadastro.value;

      this.pacientesService.criar(novoPaciente).subscribe({
        next: (res) => {
          this.carregando = false;
          this.mostraMensagem("Paciente cadastrado com sucesso!", true)
          this.formCadastro.reset();
        },
        error: (err) => {
          this.carregando = false;
          this.mostraMensagem("Não foi possível cadastrar o paciente.", false);
        }
      });
    }
  }
  mostraMensagem(msg: string, tipo: boolean) {
    if (tipo) {
      Swal.fire({
        title: 'Sucesso!',
        text: msg,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
    }
  }
}
