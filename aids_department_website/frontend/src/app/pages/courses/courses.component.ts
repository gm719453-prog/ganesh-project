import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [
    {
      name: 'Python Programming',
      description: 'Master core Python, OOPs, data structures, and libraries like NumPy & Pandas.',
      duration: '6 Weeks',
      difficulty: 'Beginner',
      enroll_url: '#'
    },
    {
      name: 'Data Science Foundation',
      description: 'Explore statistical methods, exploratory data analysis, and predictive modeling.',
      duration: '8 Weeks',
      difficulty: 'Intermediate',
      enroll_url: '#'
    },
    {
      name: 'Machine Learning',
      description: 'Implement regression, classification, clustering algorithms, and scikit-learn.',
      duration: '10 Weeks',
      difficulty: 'Intermediate',
      enroll_url: '#'
    },
    {
      name: 'Deep Learning Specialization',
      description: 'Deep dive into computer vision, sequence models, transformers, and TensorFlow/PyTorch.',
      duration: '12 Weeks',
      difficulty: 'Advanced',
      enroll_url: '#'
    },
    {
      name: 'Generative AI & LLMs',
      description: 'Learn prompt engineering, fine-tuning large language models, and LangChain frameworks.',
      duration: '8 Weeks',
      difficulty: 'Advanced',
      enroll_url: '#'
    },
    {
      name: 'SQL for Data Analytics',
      description: 'Write complex joins, subqueries, CTEs, window functions, and database design.',
      duration: '4 Weeks',
      difficulty: 'Beginner',
      enroll_url: '#'
    },
    {
      name: 'Power BI & Tableau',
      description: 'Design dashboards, DAX expressions, data blending, and stories.',
      duration: '6 Weeks',
      difficulty: 'Beginner',
      enroll_url: '#'
    },
    {
      name: 'Full Stack Development',
      description: 'Build responsive web apps using Angular, Node.js, Express, and MongoDB.',
      duration: '16 Weeks',
      difficulty: 'Advanced',
      enroll_url: '#'
    },
    {
      name: 'Cloud Computing (AWS/GCP)',
      description: 'Deploy containerized web services, serverless APIs, and databases on cloud.',
      duration: '8 Weeks',
      difficulty: 'Intermediate',
      enroll_url: '#'
    },
    {
      name: 'Prompt Engineering',
      description: 'Craft optimal prompts for chatbots, code assistants, and image generation tools.',
      duration: '3 Weeks',
      difficulty: 'Beginner',
      enroll_url: '#'
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCourses().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.courses = data;
        }
      },
      error: () => {
        // use fallback static courses
      }
    });
  }
}
