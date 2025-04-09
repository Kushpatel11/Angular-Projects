import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  showPassword = signal(false);
  rememberMe = signal(false);

  isSubmitted = signal(false);
  private router = inject(Router);

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  ngOnInit(): void {
    const remembered = localStorage.getItem('rememberedEmail');
    if (remembered) {
      this.email.set(remembered);
      this.rememberMe.set(true);
    }
  }

  onSubmit() {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const enteredEmail = this.email().trim();
    const enteredPassword = CryptoJS.SHA256(this.password()).toString();

    // remember me

    if (this.rememberMe()) {
      localStorage.setItem('rememberedEmail', enteredEmail);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    const adminEmail = 'admin@example.com';
    const adminPassword = CryptoJS.SHA256('admin123').toString();

    // Admin Login
    if (enteredEmail === adminEmail && enteredPassword === adminPassword) {
      localStorage.setItem(
        'adminSession',
        JSON.stringify({ role: 'admin', adminEmail })
      );
      alert('Wlcome Admin!');
      this.router.navigate(['/admindashboard']);
      return;
    } else {
      // user login
      const matchedUser = users.find(
        (user: any) =>
          user.email === enteredEmail && user.password === enteredPassword
      );

      if (matchedUser) {
        localStorage.setItem(
          'loggedInUserSession',
          JSON.stringify({ role: 'user', matchedUser })
        );
        this.isSubmitted.set(true);
        this.router.navigate(['/profile']);
      } else {
        alert('Invalid email or password');
      }
    }
  }
}
