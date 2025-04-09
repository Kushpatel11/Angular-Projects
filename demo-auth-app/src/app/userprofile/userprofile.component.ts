import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from './user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // 💥 required for standalone
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserProfileComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  isDarkMode = false;

  form = signal<FormGroup>(
    this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '' }],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    })
  );

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.applyTheme();

    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUserSession') || '{}'
    );

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const currentUser = users.find(
      (u: any) => u.email === loggedInUser.matchedUser.email
    );

    if (loggedInUser) {
      this.form().patchValue({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        mobile: currentUser.mobile || '',
        password: currentUser.password || '',
      });
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    this.applyTheme();
  }

  applyTheme() {
    const body = document.body;
    body.className = '';
    body.classList.add(this.isDarkMode ? 'dark-mode' : 'light-mode');
  }

  logOut() {
    const condirm = window.confirm('Are you sure?');
    if (condirm) {
      localStorage.removeItem('loggedInUserSession');
      this.router.navigate(['/login']);
    }
  }

  deleteAcc() {
    const confirm = window.confirm('Are you Sure?');
    if (confirm) {
      const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUserSession') || '{}'
      );
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter(
        (user: any) => user.email !== loggedInUser.matchedUser.email
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.removeItem('loggedInUserSession');
      alert('Account deleted successfully!');
      this.router.navigate(['/signup']);
    }
  }

  onUpdateProfile() {
    if (this.form().valid) {
      const updatedUser = this.form().getRawValue();
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((u: any) => u.email === updatedUser.email);

      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Profile updated successfully!');
      } else {
        alert('User not found.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
