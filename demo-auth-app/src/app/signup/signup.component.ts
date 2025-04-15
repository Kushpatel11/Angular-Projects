// signup.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule, HttpClientModule],
})
export class SignupComponent {
  private router = inject(Router);
  private http = inject(HttpClient);

  showPassword = false;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const payload = {
      firstname: this.user.firstName,
      lastname: this.user.lastName,
      email: this.user.email,
      password: this.user.password, // Raw password; backend will hash
    };

    this.http.post('http://127.0.0.1:8000/signup', payload).subscribe({
      next: (res) => {
        alert('User registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.detail || 'Registration failed!');
      },
    });
  }
}
