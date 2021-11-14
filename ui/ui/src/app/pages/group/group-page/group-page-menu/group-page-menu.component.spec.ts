import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPageMenuComponent } from './group-page-menu.component';

describe('GroupPageMenuComponent', () => {
  let component: GroupPageMenuComponent;
  let fixture: ComponentFixture<GroupPageMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPageMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
