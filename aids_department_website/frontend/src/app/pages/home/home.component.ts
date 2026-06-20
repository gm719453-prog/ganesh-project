import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  subjects = [
    { name: 'Deep Learning', icon: '🧠', code: 'AD501' },
    { name: 'Big Data Analytics', icon: '📊', code: 'AD502' },
    { name: 'Natural Language Processing', icon: '💬', code: 'AD503' },
    { name: 'Computer Vision', icon: '👁️', code: 'AD504' },
    { name: 'Internet of Things', icon: '🌐', code: 'AD505' },
  ];

  stats = [
    { label: 'Students', value: '500+' },
    { label: 'Faculty Members', value: '25+' },
    { label: 'Research Labs', value: '5' },
    { label: 'Placement Rate', value: '95%' }
  ];

  announcements: any[] = [];
  events = [
    { title: 'National Web conference on AI & GenAI', date: 'June 25, 2026' },
    { title: 'Hands-on Big Data Hackathon', date: 'July 10, 2026' },
    { title: 'Guest Lecture on LLMs in Industry', date: 'July 18, 2026' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAnnouncements().subscribe({
      next: (data) => {
        this.announcements = data.slice(0, 3);
      },
      error: () => {
        // Fallback static announcements
        this.announcements = [
          { title: 'Academic registration begins next week.', date: new Date().toISOString() },
          { title: 'Internship drive open for 2027 batch.', date: new Date().toISOString() }
        ];
      }
    });
  }

  ngAfterViewInit(): void {
    // GSAP Entrance Animations
    gsap.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.hero-desc', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out'
    });

    gsap.from('.stat-card', {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.6,
      ease: 'back.out(1.7)'
    });
  }
}
