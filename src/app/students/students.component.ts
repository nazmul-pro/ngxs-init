import { StudentService } from './../service/student.service';
import { Component, OnInit } from '@angular/core';
import {StudentsState} from '../states/students.state';
import {Select, Store} from '@ngxs/store';
import {Students} from '../models/Students';
import {Observable} from 'rxjs';
import {DeleteStudent, GetStudents, SetSelectedStudent} from '../actions/students.action';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @Select(StudentsState.getStudentList) students: Observable<Students[]>;
  constructor(private ss: StudentService,private store: Store) { }
  fst = null;
  ngOnInit() {
    this.students.subscribe(x=>console.log(x));
    console.log();
    this.store.dispatch(new GetStudents());
    this.students.subscribe(x=>{console.log(x),this.selectStudent(x[0])});

    
  }

  selectStudent(st: Students) {
    this.fst = st
    this.store.dispatch(new SetSelectedStudent(st));
  }

  deleteStudent(id: number) {
    this.store.dispatch(new DeleteStudent(id));
  }

  editStudent(payload: Students) {
      this.store.dispatch(new SetSelectedStudent(payload));
  }

}
