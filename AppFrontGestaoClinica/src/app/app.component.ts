import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    RouterModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestão de Clínica';
  isMobile = false;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  close() {
    // Pode ser usado para lógica adicional ao fechar o menu no mobile
  }
}
