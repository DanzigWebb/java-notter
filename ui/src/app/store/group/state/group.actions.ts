import { GroupCreateDto, GroupDto } from '@app/models';

export namespace GroupActions {
  export class GetAll {
    static readonly type = '[Group] Get items';
  }

  export class GetOne {
    static readonly type = '[Group] Get item';

    constructor(public id: number) { }
  }

  export class Create {
    static readonly type = '[Group] Add item';

    constructor(public payload: GroupCreateDto) { }
  }

  export class Remove {
    static readonly type = '[Group] Remove item';

    constructor(public payload: number) { }
  }

  export class Update {
    static readonly type = '[Group] Update item';

    constructor(public payload: GroupDto) { }
  }
}
