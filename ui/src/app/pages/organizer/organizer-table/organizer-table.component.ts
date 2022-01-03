import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { DiaryCreateDto, DiaryDto } from '@app/models';
import { Day } from '../calendar/models/day';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-organizer-table',
  templateUrl: './organizer-table.component.html',
  styleUrls: ['./organizer-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizerTableComponent implements OnInit, OnChanges {

  @Input() day!: Day;
  @Input() items: DiaryDto[] = [];

  @Output() onClose = new EventEmitter();

  diary: DiaryCreateDto = {
    bodySensation: '',
    day: '',
    emotions: '',
    reaction: '',
    situation: '',
    think: ''
  };

  constructor(
    private diaryService: DiaryService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.day) {
      this.diary.day = this.day.date.toDate().getTime();
    }
  }

  ngOnInit(): void {
  }

  save() {
    const dto = {...this.diary};
    this.diaryService.save(dto).subscribe(data => {
      console.log(data);
    });
  }

  close() {
    this.onClose.emit();
  }
}
