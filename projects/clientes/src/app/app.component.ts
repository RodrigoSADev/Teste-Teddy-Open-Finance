import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shell/src/app/components/header/header.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';

@Component({
  selector: 'app-clientes-root',
  imports: [HeaderComponent, ListClientsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'clientes';
}
