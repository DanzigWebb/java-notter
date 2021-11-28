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

    constructor(public payload: TodoCreateDto, public noteId: number) {
    }
  }

  export class UpdateTodo {
    static readonly type = '[Note] Update todo';

    constructor(public payload: TodoDto, public noteId: number) {
    }
  }

  export class UpdateTodoOrder {
    static readonly type = '[Note] Update todo order';

    constructor(public payload: UpdateOrderDto[]) {
    }
  }

  export class DeleteTodo {
    static readonly type = '[Note] Delete todo';

    constructor(public todoId: number, public noteId: number) {
    }
  }
}


