import { keyframes, style, AnimationQueryMetadata, AnimationKeyframesSequenceMetadata, query, animate } from '@angular/animations';




export const forwardAnimation = [
  // animate the leave page away
  query(':leave', [
    style({ display: 'visible' })
  ]),
  query(':enter', animate(200, keyframes([
    style({
      transform: 'translateY(30%)',
      position: 'fixed',
      height: '100%',
      width: '100%',
      offset: 0,
      zIndex: 500
    }),
    style({
      transform: 'translateY(0)',
      position: 'fixed',
      height: '100%',
      width: '100%',
      zIndex: 500,      
      offset: 1
    })
  ])))
];


export const backAnimation = [
  // animate the leave page away
  query(':leave', animate(200, keyframes([
    style({
      transform: 'translateX(0)',
      position: 'fixed',
      height: '100%',
      width: '100%',
      offset: 0
    }),
    style({
      transform: 'translateY(100%)',
      position: 'fixed',
      height: '100%',
      width: '100%',
      offset: 1
    })
  ]))),
  query(':enter', [
    style({
      transform: 'translateY(0)',
      position: 'absolute',
      height: '100%',
      width: '100%',
      visibility: 'hidden'
    })
  ]),
];
