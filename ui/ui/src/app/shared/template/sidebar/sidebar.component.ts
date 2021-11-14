import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { GroupCreateDto, GroupDto } from '@app/models';
import { ModalService } from 'am-bulba';
import { RenameGroupDialog } from './rename-group.dialog';
import { filter } from 'rxjs/operators';
import { Instance } from '@popperjs/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  @Input() groups: GroupDto[] = [];
  @Input() isExpand = true;

  @Output() onExpand = new EventEmitter<boolean>();
  @Output() onCreateGroup = new EventEmitter<GroupCreateDto>();
  @Output() onUpdateGroup = new EventEmitter<GroupDto>();
  @Output() onCheckGroup = new EventEmitter<GroupDto>();
  @Output() onDeleteGroup = new EventEmitter<GroupDto>();

  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.expandEmit(!this.isExpand);
  }

  expand() {
    this.expandEmit(true);
  }

  expandEmit(state: boolean) {
    this.onExpand.emit(state);
  }

  checkEmit(group: GroupDto) {
    this.onCheckGroup.emit(group);
  }

  createEmit(group: GroupCreateDto) {
    this.onCreateGroup.emit(group);
  }

  deleteEmit(group: GroupDto) {
    this.onDeleteGroup.emit(group);
  }

  animEnd(input: HTMLInputElement) {
    if (this.isExpand) {
      input.focus();
    }
  }

  renameGroup(group: GroupDto) {
    this.modalService.open<GroupDto>(RenameGroupDialog, group).pipe(
      filter((group) => !!group),
    ).subscribe(group => {
      this.onUpdateGroup.emit(group);
    });
  }
}

@Directive({
  selector: '[indicator]'
})
export class IndicatorDirective implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  indicator: string | number | undefined;

  private popperRef: Instance | undefined;

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const div = this.createRef();
    this.render.setStyle(this.el.nativeElement, 'position', 'relative')
    this.render.appendChild(this.el.nativeElement, div);
  }

  private createRef(): HTMLElement {
    const wrapper = this.render.createElement('div');
    this.render.setStyle(wrapper, 'position', 'absolute');
    this.render.setStyle(wrapper, 'left', '0px');
    this.render.setStyle(wrapper, 'top', '-5px');

    const div = this.render.createElement('div');
    this.render.setProperty(div, 'innerText', this.indicator);
    this.render.addClass(div, 'badge')
    this.render.addClass(div, 'badge-primary')
    this.render.appendChild(wrapper, div);

    return wrapper;
  }

  ngOnDestroy() {
    this.popperRef?.destroy();
  }
}
