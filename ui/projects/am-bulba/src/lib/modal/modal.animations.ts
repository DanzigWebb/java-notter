import { animate, style, transition, trigger } from '@angular/animations';

export const modalDefault = trigger('modalDefault', [
  transition(':enter', [
    style({
      transform: 'translateY(80px)',
      opacity: 0
    }),
    animate('220ms cubic-bezier(.4,0,.2,1)', style({
      transform: 'translateY(0)',
      opacity: 1,
    })),
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0)',
      opacity: 1,
    }),
    animate('100ms cubic-bezier(.4,0,.2,1)', style({
      transform: 'translateY(-40px)',
      opacity: 0
    })),
  ]),
]);

export const modalSlide = trigger('modalSlide', [
  transition(':enter', [
    style({
      transform: 'translateY(100%)',
      opacity: '0',
    }),
    animate('450ms cubic-bezier(0.6, -0.25, 0.2, 1.3)', style({
      transform: 'translateY(0)',
      opacity: '1',
    })),
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0)',
    }),
    animate('340ms cubic-bezier(0.6, -0.25, 0.2, 1.3)', style({
      transform: 'translateY(100%)',
    })),
  ]),
]);

export const backdrop = trigger('backdrop', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate('120ms ease-in', style({
      opacity: 1,
    })),
  ]),
  transition(':leave', [
    style({
      opacity: 1,
    }),
    animate('90ms ease-in', style({
      opacity: 0,
    })),
  ]),
]);
