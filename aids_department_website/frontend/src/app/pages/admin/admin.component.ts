import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isAuthorized = false;
  
  // Forms states
  announcementTitle = '';
  announcementContent = '';

  courseName = '';
  courseDescription = '';
  courseDuration = '';
  courseDifficulty = 'Beginner';
  courseEnrollUrl = '#';

  subjectName = '';
  subjectCode = '';
  subjectDescription = '';
  subjectIcon = '🧠';

  successMessage = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('is_admin');
    
    // For local testing/demo, let any token enter. In production, validate JWT claim.
    if (token) {
      this.isAuthorized = true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  addAnnouncement() {
    this.clearMessages();
    if (!this.announcementTitle || !this.announcementContent) {
      this.errorMessage = 'Title and Content are required.';
      return;
    }
    const announcement = { title: this.announcementTitle, content: this.announcementContent };
    this.apiService.createAnnouncement(announcement).subscribe({
      next: () => {
        this.successMessage = 'Announcement published successfully!';
        this.announcementTitle = '';
        this.announcementContent = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Failed to publish announcement. Make sure you are logged in.';
      }
    });
  }

  addCourse() {
    this.clearMessages();
    if (!this.courseName || !this.courseDescription || !this.courseDuration) {
      this.errorMessage = 'Name, Description, and Duration are required.';
      return;
    }
    const course = {
      name: this.courseName,
      description: this.courseDescription,
      duration: this.courseDuration,
      difficulty: this.courseDifficulty,
      enroll_url: this.courseEnrollUrl
    };
    this.apiService.createCourse(course).subscribe({
      next: () => {
        this.successMessage = 'Course created successfully!';
        this.courseName = '';
        this.courseDescription = '';
        this.courseDuration = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Failed to create course. Make sure you are logged in.';
      }
    });
  }

  addSubject() {
    this.clearMessages();
    if (!this.subjectName || !this.subjectCode || !this.subjectDescription) {
      this.errorMessage = 'Subject Name, Code, and Description are required.';
      return;
    }
    const subject = {
      name: this.subjectName,
      code: this.subjectCode,
      description: this.subjectDescription,
      icon: this.subjectIcon
    };
    this.apiService.createSubject(subject).subscribe({
      next: () => {
        this.successMessage = 'Subject created successfully!';
        this.subjectName = '';
        this.subjectCode = '';
        this.subjectDescription = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Failed to create subject. Make sure you are logged in.';
      }
    });
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('student_id');
    localStorage.removeItem('is_admin');
    this.router.navigate(['/login']);
  }
}
