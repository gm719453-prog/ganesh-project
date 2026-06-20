import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  login(student_id: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', student_id);
    body.set('password', password);

    return this.http.post(`${this.baseUrl}/token`, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  register(student_id: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/`, { student_id, password });
  }

  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/subjects/`);
  }

  createSubject(subject: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/subjects/`, subject, { headers: this.getHeaders() });
  }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courses/`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/courses/`, course, { headers: this.getHeaders() });
  }

  getAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/announcements/`);
  }

  createAnnouncement(announcement: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/announcements/`, announcement, { headers: this.getHeaders() });
  }
}
