import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GroupDto, NoteDto } from '@app/models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit, OnChanges {

  @Input() group!: GroupDto;

  notesMap = new Map<string, NoteDto[]>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.group) {
      this.categorizeNotes()
    }
  }

  categorizeNotes() {
    const map = new Map<string, NoteDto[]>();
    map.set('active', this.group.notes.filter(n => !n.checked));
    map.set('done', this.group.notes.filter(n => n.checked));
    this.notesMap = map;
  }

  checkNote(note: NoteDto) {

  }

  dropNote(event: CdkDragDrop<NoteDto[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
