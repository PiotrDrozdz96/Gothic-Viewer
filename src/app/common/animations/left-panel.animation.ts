import { trigger, style, animate, transition } from '@angular/animations';

export const leftPanelAnimation = trigger(
  'leftPanelAnimation', [
    transition(':enter', [
      style({ left: -360 }),
      animate('200ms', style({ left: 0 })),
    ]),
    transition(':leave', [
      style({ left: 0}),
      animate('200ms', style({ left: -360 })),
    ]),
  ],
);
