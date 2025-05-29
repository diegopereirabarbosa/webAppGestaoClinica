import { Component, inject, ViewChild } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Paciente } from '../../models/paciente.model';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-listar',
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
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
  providers: [PacientesService]
})

export class ListarComponent {
  displayedColumns: string[] = ['id', 'nome', 'telefone', 'sexo', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Paciente>();
  pacientesLista: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private pacientesService: PacientesService) { }

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
