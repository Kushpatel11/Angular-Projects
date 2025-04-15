// auth/admin.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private router = inject(Router);

  canActivate(): boolean {
    const admin = JSON.parse(sessionStorage.getItem('adminSession') || 'null');
    if (admin && admin.role === 'admin') {
      return true;
    }

    this.router.navigate(['/login']); // redirect to login
    return false;
  }
}
