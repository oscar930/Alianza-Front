import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Asegúrate de importar esto
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module'; // Asegúrate de importar las rutas correctamente

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)  // Esto es necesario si usas rutas
  ]
});