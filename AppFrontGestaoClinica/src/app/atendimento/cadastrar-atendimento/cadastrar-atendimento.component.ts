import { Component } from '@angular/core';
import { AtendimentosService } from '../../services/atendimentos.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Atendimento } from '../../models/atendimento.model';
import Swal from 'sweetalert2';
import { Paciente } from '../../models/paciente.model';
import { PacientesService } from '../../services/pacientes.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-cadastrar-atendimento',
  templateUrl: './cadastrar-atendimento.component.html',
  styleUrl: './cadastrar-atendimento.component.css',
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
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,

  ],
  providers: [AtendimentosService, PacientesService]
})
export class CadastrarAtendimentoComponent {
  formCadastro!: FormGroup;
  carregando: boolean = false;
  filtroCtrl = new FormControl('');
  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private pacientesService: PacientesService,
  private atendimentosService: AtendimentosService) { }
  ngOnInit(): void {
    this.formCadastro = this.fb.group({
      pacienteId: [null, Validators.required],
      status: [],
    })

    this.pacientesService.listarTodos().subscribe(data => {
      this.pacientes = data;
      this.pacientesFiltrados = data;
    });

    this.filtroCtrl.valueChanges.pipe(debounceTime(300)).subscribe(valor => {
      this.filtrarPacientes(valor || '');
    });
  }

  onSubmit() {
    if (this.formCadastro.valid) {debugger
      this.carregando = true;
      const novoAtendimento: Atendimento = this.formCadastro.value;
      novoAtendimento.status = Number(novoAtendimento.status);
      novoAtendimento.id = 0;
      novoAtendimento.numeroSequencial = 0;
      this.atendimentosService.criar(novoAtendimento).subscribe({
        next: (res) => {
          this.carregando = false;
          this.mostraMensagem("Atendimento Nº "+res.numeroSequencial+ " gerado com sucesso!", true)
          this.formCadastro.reset();
        },
        error: (err) => {debugger
          this.carregando = false;
          this.mostraMensagem("Não foi possível cadastrar o atendimento. " +err.error, false);
        }
      });
    }
  }

  filtrarPacientes(termo: string) {
    const texto = termo.toLowerCase();
    this.pacientesFiltrados = this.pacientes.filter(p =>
      p.nome.toLowerCase().includes(texto)
    );
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
