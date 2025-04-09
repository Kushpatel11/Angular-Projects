import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admindashboard',
    loadChildren: () =>
      import('./admindashboard/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./userprofile/user.routes').then((m) => m.userRoutes),
  },
];
