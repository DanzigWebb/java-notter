import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerTableComponent } from './organizer-table.component';

describe('OrganizerTableComponent', () => {
  let component: OrganizerTableComponent;
  let fixture: ComponentFixture<OrganizerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
