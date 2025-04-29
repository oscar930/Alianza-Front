import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';

export const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/create', component: ClientCreateComponent },
  { path: '**', redirectTo: 'clients' } // fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }