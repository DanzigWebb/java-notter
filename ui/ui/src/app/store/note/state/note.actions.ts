import { NoteCreateDto, NoteDto } from '@app/models';

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
}


