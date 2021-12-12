import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionGroup } from './accordion';

describe('AccordionComponent', () => {
  let component: AccordionGroup;
  let fixture: ComponentFixture<AccordionGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionGroup ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
