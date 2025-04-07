import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdminDashboardComponent {
  users = signal([
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com' },
  ]);

  deleteUser(index: number) {
    const updated = this.users().toSpliced(index, 1);
    this.users.set(updated);
  }

  logout() {
    console.log('Logout clicked');
  }
}
