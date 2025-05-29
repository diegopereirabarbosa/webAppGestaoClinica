import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideNgxMask } from 'ngx-mask';
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    provideNgxMask()
  ]
});
