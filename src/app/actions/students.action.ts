import { Students } from '../models/Students';

export class AddStudent {
    static readonly type = '[Students] Add';

    constructor(public payload: Students) {
    }
}

export class GetStudents {
    static readonly type = '[Students] Get';
}

export class UpdateStudent {
    static readonly type = '[Students] Update';

    constructor(public payload: Students, public id: number) {
    }
}

export class DeleteStudent {
    static readonly type = '[Students] Delete';

    constructor(public id: number) {
    }
}

export class SetSelectedStudent {
    static readonly type = '[Students] Set';

    constructor(public payload: Students) {
    }
}