import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../userprofile/user.model';
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
    console.log('submitted');
    const newUser = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password,
    };

    const storedUsers = window.localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.password = '';
    this.router.navigate(['/login']);
  }
}
