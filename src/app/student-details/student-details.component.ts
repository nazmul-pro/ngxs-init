import { Component, OnInit } from '@angular/core';
import {StudentsState} from '../states/students.state';
import {Select, Store} from '@ngxs/store';
import {Students} from '../models/Students';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  @Select(StudentsState.getselectedStudent) selectedTodo: Observable<Students>;
  constructor(private store: Store) { }

  ngOnInit() {
    // this.store.dispatch();
    this.selectedTodo.subscribe(x=>console.log(x, 'from store'));
  }

}
