import { NoteCreateDto, NoteDto, TodoCreateDto, TodoDto, UpdateOrderDto } from '@app/models';

export namespace NoteActions {
  export class Create {
    static readonly type = '[Note] Create item';

    constructor(public payload: NoteCreateDto) {
    }
  }

  export class Update {
    static readonly type = '[Note] Update item';

    constructor(public payload: NoteDto) {
    }
  }

  export class Remove {
    static readonly type = '[Note] Remove item';

    constructor(public payload: number) {
    }
  }

  export class AddTodo {
    static readonly type = '[Note] Add todo';

    constructor(public payload: TodoCreateDto, public note: NoteDto) {
    }
  }

  export class UpdateTodo {
    static readonly type = '[Note] Update todo';

    constructor(public payload: TodoDto, public note: NoteDto) {
    }
  }

  export class DeleteTodo {
    static readonly type = '[Note] Delete todo';

    constructor(public todoId: number, public note: NoteDto) {
    }
  }

  export class UpdateTodoOrder {
    static readonly type = '[Note] Update todo order';

    constructor(public payload: UpdateOrderDto[], public note: NoteDto) {
    }
  }

  export class UpdateNoteOrder {
    static readonly type = '[Note] Update note order';

    constructor(public payload: UpdateOrderDto[]) {
    }
  }
}


