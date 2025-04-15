// login.component.ts
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule],
})
export class LoginComponent {
  private router = inject(Router);
  private http = inject(HttpClient);

  email = signal('');
  password = signal('');
  showPassword = signal(false);
  rememberMe = signal(false);
  isSubmitted = signal(false);

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
    const enteredEmail = this.email().trim();
    const enteredPassword = this.password().trim();

    // Save email if rememberMe is on
    if (this.rememberMe()) {
      localStorage.setItem('rememberedEmail', enteredEmail);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // Admin login (optional, still local)
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    if (enteredEmail === adminEmail && enteredPassword === adminPassword) {
      sessionStorage.setItem(
        'adminSession',
        JSON.stringify({ role: 'admin', adminEmail })
      );
      alert('Welcome Admin!');
      this.router.navigate(['/admindashboard']);
      return;
    }

    // Real API login
    const payload = { email: enteredEmail, password: enteredPassword };

    this.http.post<any>('http://127.0.0.1:8000/login', payload).subscribe({
      next: (res) => {
        sessionStorage.setItem(
          'userSession',
          JSON.stringify({
            token: res.access_token,
            role: 'user',
            email: enteredEmail,
          })
        );
        alert('Login successful!');
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        alert(err.error.detail || 'Invalid credentials!');
      },
    });
  }
}
