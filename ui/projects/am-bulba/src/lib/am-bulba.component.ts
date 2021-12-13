import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'am-bulba',
  template: `
    <p>
      am-bulba works!
    </p>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmBulbaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
