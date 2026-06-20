import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  searchQuery: string = '';
  filteredSubjects: any[] = [];
  selectedSubject: any = null;

  subjects: any[] = [
    {
      name: 'Deep Learning',
      code: 'AD501',
      description: 'Learn deep neural networks, CNNs, RNNs, and Generative Adversarial Networks.',
      icon: '🧠',
      units: [
        { title: 'Unit 1: Introduction to Neural Networks & Backpropagation', url: '#' },
        { title: 'Unit 2: Convolutional Neural Networks (CNNs)', url: '#' },
        { title: 'Unit 3: Recurrent Neural Networks (RNNs) & LSTMs', url: '#' },
        { title: 'Unit 4: Autoencoders & Generative Adversarial Networks (GANs)', url: '#' },
        { title: 'Unit 5: Reinforcement Learning & Applications of DL', url: '#' }
      ],
      pyqs: [
        { year: 2025, url: '#' },
        { year: 2024, url: '#' },
        { year: 2023, url: '#' }
      ]
    },
    {
      name: 'Big Data Analytics',
      code: 'AD502',
      description: 'Master Hadoop ecosystem, MapReduce programming, Apache Spark, and NoSQL databases.',
      icon: '📊',
      units: [
        { title: 'Unit 1: Introduction to Big Data & Hadoop Ecosystem', url: '#' },
        { title: 'Unit 2: MapReduce Programming Paradigm', url: '#' },
        { title: 'Unit 3: Apache Spark & Real-time Stream Processing', url: '#' },
        { title: 'Unit 4: NoSQL Databases (MongoDB, Cassandra)', url: '#' },
        { title: 'Unit 5: Big Data Analytics Applications & Visualizations', url: '#' }
      ],
      pyqs: [
        { year: 2025, url: '#' },
        { year: 2024, url: '#' },
        { year: 2023, url: '#' }
      ]
    },
    {
      name: 'Natural Language Processing',
      code: 'AD503',
      description: 'Analyze text processing, word vectors, sequence labeling, and transformers.',
      icon: '💬',
      units: [
        { title: 'Unit 1: Introduction to Natural Language Processing & Text Preprocessing', url: '#' },
        { title: 'Unit 2: Lexical and Syntactic Analysis', url: '#' },
        { title: 'Unit 3: Word Embeddings (Word2Vec, GloVe)', url: '#' },
        { title: 'Unit 4: Sequence Models & Named Entity Recognition', url: '#' },
        { title: 'Unit 5: Attention Mechanisms & Transformers (BERT, GPT)', url: '#' }
      ],
      pyqs: [
        { year: 2025, url: '#' },
        { year: 2024, url: '#' },
        { year: 2023, url: '#' }
      ]
    },
    {
      name: 'Computer Vision',
      code: 'AD504',
      description: 'Implement image processing, feature detection, object recognition, and tracking.',
      icon: '👁️',
      units: [
        { title: 'Unit 1: Fundamentals of Image Processing & Representation', url: '#' },
        { title: 'Unit 2: Image Filters, Edge Detection, & Features', url: '#' },
        { title: 'Unit 3: Object Recognition & Classification', url: '#' },
        { title: 'Unit 4: Image Segmentation & Motion Tracking', url: '#' },
        { title: 'Unit 5: 3D Reconstruction & Modern Vision Transformers', url: '#' }
      ],
      pyqs: [
        { year: 2025, url: '#' },
        { year: 2024, url: '#' },
        { year: 2023, url: '#' }
      ]
    },
    {
      name: 'Internet of Things',
      code: 'AD505',
      description: 'Build smart devices, cloud connections, and IoT security solutions.',
      icon: '🌐',
      units: [
        { title: 'Unit 1: Introduction to IoT Architecture & Protocols', url: '#' },
        { title: 'Unit 2: Microcontrollers, Sensors, & Actuators', url: '#' },
        { title: 'Unit 3: IoT Communication Technologies (Zigbee, LoRaWAN)', url: '#' },
        { title: 'Unit 4: Cloud Integration & IoT Analytics Platforms', url: '#' },
        { title: 'Unit 5: IoT Security, Vulnerabilities, & Edge Computing', url: '#' }
      ],
      pyqs: [
        { year: 2025, url: '#' },
        { year: 2024, url: '#' },
        { year: 2023, url: '#' }
      ]
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getSubjects().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          // Map backend subjects to includes mock units if they are missing
          this.subjects = data.map(sub => ({
            ...sub,
            units: sub.notes && sub.notes.length > 0 ? sub.notes.map((n: any) => ({ title: n.title, url: n.file_url })) : [
              { title: 'Unit 1: Fundamentals & Basic Concepts', url: '#' },
              { title: 'Unit 2: Intermediate Architecture & Processors', url: '#' },
              { title: 'Unit 3: Core Algorithm Implementation', url: '#' },
              { title: 'Unit 4: Advanced Systems & Integration', url: '#' },
              { title: 'Unit 5: Real-World Applications & Lab', url: '#' }
            ],
            pyqs: sub.question_papers && sub.question_papers.length > 0 ? sub.question_papers.map((p: any) => ({ year: p.year, url: p.file_url })) : [
              { year: 2025, url: '#' },
              { year: 2024, url: '#' },
              { year: 2023, url: '#' }
            ]
          }));
        }
        this.filterSubjects();
        this.selectedSubject = this.filteredSubjects[0];
      },
      error: () => {
        this.filterSubjects();
        this.selectedSubject = this.filteredSubjects[0];
      }
    });
  }

  filterSubjects() {
    if (!this.searchQuery) {
      this.filteredSubjects = this.subjects;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredSubjects = this.subjects.filter(sub => 
        sub.name.toLowerCase().includes(query) || sub.code.toLowerCase().includes(query)
      );
    }
  }

  selectSubject(sub: any) {
    this.selectedSubject = sub;
  }
}
