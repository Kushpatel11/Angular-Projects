import { Routes } from '@angular/router';
import { SignupComponent } from './features/signup/signup.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admindashboard',
    loadChildren: () =>
      import('./features/admindashboard/admin.routes').then(
        (m) => m.adminRoutes
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/userprofile/user.routes').then((m) => m.userRoutes),
  },
];
