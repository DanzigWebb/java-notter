import { TagCreateDto, TagDto } from '@app/models';

export namespace TagActions {
  export class Create {
    static readonly type = '[Tag] Add item';
    constructor(public payload: TagCreateDto) { }
  }

  export class Update {
    static readonly type = '[Tag] Update item';
    constructor(public payload: TagDto) { }
  }

  export class Delete {
    static readonly type = '[Tag] Delete item';
    constructor(public payload: number) { }
  }

  export class GetAll {
    static readonly type = '[Tag] Get all';
  }

  export class GetColors {
    static readonly type = '[Tag] Get tag colors';
  }
}

