import { Component } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admindashboard/admindashboard.component';

@Component({
  selector: 'app-root',
  imports: [AdminDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'demo-auth-app';
}
