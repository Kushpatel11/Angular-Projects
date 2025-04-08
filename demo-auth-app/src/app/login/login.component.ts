import { CommonModule, NgClass, TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [NgClass, TitleCasePipe, FormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  showPassword = signal(false);
  strength = signal<'weak' | 'medium' | 'strong' | null>(null);
  isSubmitted = signal(false);

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  onPasswordInput(value: string) {
    this.password.set(value);
    const len = value.length;
    this.strength.set(len < 6 ? 'weak' : len < 10 ? 'medium' : 'strong');
  }
  onSubmit(): void {
    this.isSubmitted.set(true);
  }
}
