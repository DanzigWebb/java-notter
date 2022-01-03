import { Day } from './calendar/models/day';
import { DiaryDto } from '@app/models';

export interface OrganizerModalContextData {
  day: Day;
  items: DiaryDto[];
}
