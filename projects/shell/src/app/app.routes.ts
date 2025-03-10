import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'clientes',
    loadComponent: () =>
      loadRemoteModule('clientes', './Component').then((m) => m.AppComponent),
  },
];
