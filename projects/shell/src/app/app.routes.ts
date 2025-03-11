import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { ListClientsComponent } from '../../../clientes/src/app/components/list-clients/list-clients.component';
import { SelectedClientsComponent } from '../../../clientes/src/app/components/selected-clients/selected-clients.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'clientes',
    loadComponent: () =>
      loadRemoteModule('clientes', './Component').then((m) => m.AppComponent),
    children: [
      { path: '', component: ListClientsComponent },
      { path: 'clientes-selecionados', component: SelectedClientsComponent },
    ],
    canActivate: [authGuard],
  },
];
