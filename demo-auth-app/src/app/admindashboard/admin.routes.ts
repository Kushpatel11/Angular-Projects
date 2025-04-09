import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admindashboard.component';
import { AdminGuard } from '../auth/admin.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
];
