import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Students} from '../models/Students';
import {AddStudent, DeleteStudent, GetStudents, SetSelectedStudent, UpdateStudent} from '../actions/students.action';
import { StudentService} from '../service/student.service';
import {tap} from 'rxjs/operators';

export class StudentsStateModel {
    students: Students[];
    selectedStudent: Students;
}

@State<StudentsStateModel>({
    name: 'students',
    defaults: {
        students: [],
        selectedStudent: null
    }
})
export class StudentsState {

    constructor(private studentService: StudentService) {
    }

    @Selector()
    static getStudentList(state: StudentsStateModel) {
        return state.students;
    }

    @Selector()
    static getselectedStudent(state: StudentsStateModel) {
        return state.selectedStudent;
    }

    @Action(GetStudents)
    getStudents({getState, setState}: StateContext<StudentsStateModel>) {
        return this.studentService.fetchStudents().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                students: result,
            });
        }));
    }

    @Action(AddStudent)
    addTodo({getState, patchState}: StateContext<StudentsStateModel>, {payload}: AddStudent) {
        return this.studentService.addStudent(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                students: [...state.students, result]
            });
        }));
    }

    @Action(UpdateStudent)
    updateTodo({getState, setState}: StateContext<StudentsStateModel>, {payload, id}: UpdateStudent) {
        return this.studentService.updateStudent(payload, id).pipe(tap((result) => {
            const state = getState();
            const todoList = [...state.students];
            const todoIndex = todoList.findIndex(item => item.id === id);
            todoList[todoIndex] = result;
            setState({
                ...state,
                students: todoList,
            });
        }));
    }


    @Action(DeleteStudent)
    deleteTodo({getState, setState}: StateContext<StudentsStateModel>, {id}: DeleteStudent) {
        return this.studentService.deleteStudent(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.students.filter(item => item.id !== id);
            setState({
                ...state,
                students: filteredArray,
            });
        }));
    }

    @Action(SetSelectedStudent)
    setselectedStudentId({getState, setState}: StateContext<StudentsStateModel>, {payload}: SetSelectedStudent) {
        const state = getState();
        setState({
            ...state,
            selectedStudent: payload
        });
    }
}