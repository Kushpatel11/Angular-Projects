import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdminDashboardComponent {
  private router = inject(Router);

  users = signal<{ firstName: string; lastName: string; email: string }[]>(
    JSON.parse(localStorage.getItem('users') || '[]')
  );

  deleteUser(index: number) {
    const updated = this.users().toSpliced(index, 1);
    this.users.set(updated);
  }

  logout() {
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      const admin = localStorage.getItem('adminSession');
      if (admin) {
        localStorage.removeItem('adminSession');
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
