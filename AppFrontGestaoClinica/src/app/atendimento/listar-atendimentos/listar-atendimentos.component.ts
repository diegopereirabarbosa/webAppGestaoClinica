import { Component, ViewChild } from '@angular/core';
import { AtendimentosService } from '../../services/atendimentos.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Paciente } from '../../models/paciente.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  standalone : true,
  selector: 'app-listar-atendimentos',
  templateUrl: './listar-atendimentos.component.html',
  styleUrl: './listar-atendimentos.component.css',
    imports: [CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [AtendimentosService]
})
export class ListarAtendimentoComponent {
displayedColumns: string[] = ['id', 'numeroAtendimento','nomePaciente', 'dataHoraChegada','status', 'acoes'];
  dataSource = new MatTableDataSource<Paciente>();
  pacientesLista: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private pacientesService: AtendimentosService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.pacientesService.listarTodos().subscribe({
      next: (resp) => {
        this.pacientesLista = resp;
        this.dataSource.data = this.pacientesLista;
      },
      error: (erro) => {
        console.log(erro)
      }
    });
  }
}
