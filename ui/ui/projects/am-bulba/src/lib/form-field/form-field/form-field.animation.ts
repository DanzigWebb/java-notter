import { animate, style, transition, trigger } from "@angular/animations";

export const animationError = [
  trigger('error', [
    transition(':enter', [
      style({
        opacity: '0',
        transform: 'translateY(-0.2em)',
      }),
      animate('140ms ease-out', style({
        opacity: '1',
        transform: 'translateY(0)',
      })),
    ]),
    transition(':leave', [
      style({
        opacity: '1',
        transform: 'translateY(0)',
      }),
      animate('140ms ease-out', style({
        opacity: '0',
        transform: 'translateY(-0.2em)',
      })),
    ]),
  ]),
]
