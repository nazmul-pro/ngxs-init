import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Students } from '../models/Students';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getData() {
    this.http.get<Students[]>("../assets/data/students.json")
    .subscribe((success) => {
      console.log(success);         
    });
  }

  fetchStudents() {
    return this.http.get<Students[]>('../assets/data/students.json');
  }

  deleteStudent(id: number) {
      return this.http.delete('../assets/data/students.json/${id}');
  }

  addStudent(payload: Students) {
      return this.http.post<Students>('../assets/data/students.json', payload);
  }

  updateStudent(payload: Students, id: number) {
      return this.http.put<Students>('../assets/data/students.json/${id}', payload);
  }
  
}
