import { Component , OnInit} from '@angular/core';
import {StudentsState} from './states/students.state';
import {Select, Store} from '@ngxs/store';
import {Students} from './models/Students';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Select(StudentsState.getselectedStudent) selectedTodo: Observable<Students>;
  title = 'app';
sel = null
  constructor(public store: Store) {}
  ngOnInit() {
    setTimeout(() => {
      this.selectedTodo.subscribe(x=>{console.log(x, 'from app comp'),this.sel=x});
    }, 5000);
  }
}
