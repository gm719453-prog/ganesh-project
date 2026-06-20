import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  student_id = '';
  password = '';
  rememberMe = false;
  errorMessage = '';
  successMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.student_id || !this.password) {
      this.errorMessage = 'Please enter both Student ID and Password.';
      return;
    }

    this.apiService.login(this.student_id, this.password).subscribe({
      next: (data) => {
        this.successMessage = 'Login successful!';
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('student_id', this.student_id);
        
        // Simulating checking if user is admin
        if (this.student_id.toLowerCase().startsWith('admin')) {
          localStorage.setItem('is_admin', 'true');
        } else {
          localStorage.removeItem('is_admin');
        }
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Invalid Student ID or password.';
      }
    });
  }

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.student_id || !this.password) {
      this.errorMessage = 'Please enter both Student ID and Password to register.';
      return;
    }

    this.apiService.register(this.student_id, this.password).subscribe({
      next: () => {
        this.successMessage = 'Student registration successful! You can now login.';
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Registration failed or Student ID already exists.';
      }
    });
  }
}
