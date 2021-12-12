import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';
import { Component, ViewChild } from "@angular/core";
import { TabsModule } from "./tabs.module";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TabsPositionType, TabsSizeType, TabsViewType } from "./tabs.type";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

const TAB_ITEMS = [
  {
    label: {
      title: 'Pictures',
      icon: 'fas fa-image',
    },
    content: {
      text: 'tab content with Pictures',
      icon: 'fas fa-image',
    },
  },
  {
    label: {
      title: 'Music',
      icon: 'fas fa-music',
    },
    content: {
      text: 'tab content with Music',
      icon: 'fas fa-music',
    },
  },
  {
    label: {
      title: 'Videos',
      icon: 'fas fa-film',
    },
    content: {
      text: 'tab content with Videos',
      icon: 'fas fa-film',
    },
  },
];

describe('TabsComponent', () => {
  let component: TabsTestComponent;
  let fixture: ComponentFixture<TabsTestComponent>;

  const getTabs = (): HTMLElement => fixture.nativeElement.querySelector('.tabs');
  const getLabels = (): HTMLElement[] => fixture.nativeElement.querySelectorAll('.tabs ul li');
  const getTabContent = (): HTMLElement => fixture.nativeElement.querySelector('.tab-content');

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TabsModule,
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [TabsTestComponent],
    });

    TestBed.compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TabsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create labels', () => {
    const labels = getLabels();
    expect(labels.length === 3).toBeTruthy();
  });

  it('should set classes for active label', () => {
    const [firstLabel, secondLabel] = getLabels();
    expect(firstLabel.classList.contains('is-active')).toBeTruthy();
    expect(secondLabel.classList.contains('is-active')).toBeFalsy();

    secondLabel.click();
    fixture.detectChanges();

    expect(firstLabel.classList.contains('is-active')).toBeFalsy();
    expect(secondLabel.classList.contains('is-active')).toBeTruthy();
  });

  it('should show current tab content', () => {
    const [firstLabel, secondLabel] = getLabels();
    const [firstContent, secondContent] = TAB_ITEMS[1].content.text;
    firstLabel.click();
    fixture.detectChanges();

    expect(firstLabel.classList.contains('is-active')).toBeTruthy();
    let content = getTabContent();
    expect(content.innerText.includes(firstContent)).toBeTruthy();

    secondLabel.click();
    fixture.detectChanges();

    expect(secondLabel.classList.contains('is-active')).toBeTruthy();
    content = getTabContent();
    expect(content.innerText.includes(secondContent)).toBeTruthy();
  });

  it('should set position props', () => {
    const position: TabsPositionType = 'is-centered';
    component.position = position;
    fixture.detectChanges();

    expect(getTabs().classList.contains(position)).toBeTruthy();
  });

  it('should set size props', () => {
    const size: TabsSizeType = 'is-small';
    component.size = size;
    fixture.detectChanges();

    expect(getTabs().classList.contains(size)).toBeTruthy();
  });

  it('should set viewType props', () => {
    const view: TabsViewType = 'is-boxed';
    component.viewType = view;
    fixture.detectChanges();

    expect(getTabs().classList.contains(view)).toBeTruthy();
  });

  it('should implement form control', () => {
    const index = 2;
    component.control.setValue(index);
    fixture.detectChanges();

    const labels = getLabels()[index];
    const contentText = TAB_ITEMS[index].content.text;
    let content = getTabContent();

    expect(content.innerText.includes(contentText)).toBeTruthy();
    expect(labels.classList.contains('is-active')).toBeTruthy();
  });
});

@Component({
  template: `
      <am-tabs-group
          #tabsGroup
          [formControl]="control"
          [position]="position"
          [size]="size"
          [viewType]="viewType"
          [rounded]="rounded"
      >
          <am-tab *ngFor="let tab of tabItems">
              <am-tab-label>
                <span class="icon is-small">
                    <i [ngClass]="tab.label.icon" aria-hidden="true"></i>
                </span> <span>{{tab.label.title}}</span>
              </am-tab-label>

              <div class="tab" id="tab-1">
                  <h3><i [ngClass]="tab.label.icon" aria-hidden="true"></i> {{tab.content.text}}</h3>
              </div>
          </am-tab>
      </am-tabs-group>
  `,
})
class TabsTestComponent {

  position: TabsPositionType | undefined;
  size: TabsSizeType | undefined;
  viewType: TabsViewType | undefined;
  rounded = false;

  control = new FormControl();

  @ViewChild('tabsGroup')
  public tabsGroup!: TabsComponent;

  tabItems = TAB_ITEMS;
}
