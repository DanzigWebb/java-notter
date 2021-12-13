import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

// анимация добавляется родителю списка
export const animationList = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [
        style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }),
        stagger('120ms',
          animate('400ms ease-out', style({
            opacity: 1,
            transform: 'translateY(0)'
          }))
        )],
      {optional: true}
    ),
  ])
]);
