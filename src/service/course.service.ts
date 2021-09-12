import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(public httpClient: HttpClient) { }
  getCourses(): Observable<any[]> {
    return this.httpClient.get<[]>(`${environment.apiBasePath}/api/course`);
  }

  getCourse(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiBasePath}/api/course/${id}`);
  }

  saveCourse(course: any): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiBasePath}/api/course`, course);
  }

  updateCourse(course: any): Observable<boolean> {
    return this.httpClient.put<boolean>(`${environment.apiBasePath}/api/course`, course);
  }

  deleteCourse(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${environment.apiBasePath}/api/course/${id}`);
  }
}
