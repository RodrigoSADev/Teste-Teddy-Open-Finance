import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'clientes',
    loadComponent: () =>
      loadRemoteModule('clientes', './Component').then((m) => m.AppComponent),
    canActivate: [authGuard],
  },
];
