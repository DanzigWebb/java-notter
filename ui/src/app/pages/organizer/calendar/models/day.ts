import { Dayjs } from 'dayjs';

export class Day {

  constructor(
    public date: Dayjs,
    public fromCurrentMonth: boolean,
    public isToday: boolean,
  ) {
  }


}
