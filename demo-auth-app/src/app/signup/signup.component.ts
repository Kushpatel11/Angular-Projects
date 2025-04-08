import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
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

  firstnameValue = '';
  lastnameValue = '';
  emailValue = '';
  passwordValue = '';

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log('submitted');
    const newUser = {
      firstname: this.firstnameValue,
      lastname: this.lastnameValue,
      email: this.emailValue,
      password: this.passwordValue,
    };

    const storedUsers = window.localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.firstnameValue = '';
    this.lastnameValue = '';
    this.emailValue = '';
    this.passwordValue = '';
    this.router.navigate(['/login']);
  }
}
