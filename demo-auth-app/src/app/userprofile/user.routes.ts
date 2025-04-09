import { Routes } from '@angular/router';
import { UserGuard } from '../auth/user.guard';
import { UserProfileComponent } from './userprofile.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [UserGuard],
  },
];
