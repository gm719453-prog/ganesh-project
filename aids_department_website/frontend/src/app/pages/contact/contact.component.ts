import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Placement Materials list
  placementMaterials = [
    { title: 'Quantitative Aptitude Tricks & Formulas', type: 'Aptitude PDF', size: '2.4 MB', url: '#' },
    { title: 'Logical Reasoning Practice Problems', type: 'Reasoning PDF', size: '1.8 MB', url: '#' },
    { title: 'Top 50 Data Science Interview Questions', type: 'Interview prep', size: '920 KB', url: '#' },
    { title: 'Modern ATS-Friendly Resume Template', type: 'Resume DOCX', size: '150 KB', url: '#' },
    { title: 'Data Structures & Algorithms Cheat Sheet', type: 'Coding Material', size: '3.1 MB', url: '#' }
  ];

  name = '';
  email = '';
  message = '';
  submitted = false;

  submitForm() {
    if (this.name && this.email && this.message) {
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
        this.name = '';
        this.email = '';
        this.message = '';
      }, 3000);
    }
  }
}
