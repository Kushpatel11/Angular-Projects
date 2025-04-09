import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../userprofile/user.model';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule],
})
export class SignupComponent {
  private router = inject(Router);

  showPassword = false;
  user: User = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const password = this.user.password;
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const newUser = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: hashedPassword,
    };

    const storedUsers = window.localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const existingUser = users.find(
      (user: any) => user.email === newUser.email
    );

    if (existingUser) {
      alert('Email already exists!');
      return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.password = '';
    this.router.navigate(['/login']);
  }
}
