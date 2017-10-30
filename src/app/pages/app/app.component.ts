import { currentAnimationStateSelector } from './../../selectors/selectors';
import { AppState } from './../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


const forwardAnimation = keyframes([
  style({
    transform: 'translateX(10%)',
    position: 'fixed',
    height: '100%',
    width: '100%',
    offset: 0
  }),
  style({
    transform: 'translateX(0)',
    position: 'fixed',
    height: '100%',
    width: '100%',
    offset: 1
  })
]);

const backAnimation = keyframes([
  style({
    transform: 'translateX(-10%)',
    position: 'fixed',
    height: '100%',
    width: '100%',
    offset: 0
  }),
  style({
    transform: 'translateX(0)',
    position: 'fixed',
    height: '100%',
    width: '100%',
    offset: 1
  })
]);

@Component({
  selector: 'yb-app',
  template: `<main [@pageAnimations]="pageName$ | async">
              <router-outlet></router-outlet>
            </main>`,
  animations: [
    trigger('pageAnimations', [
      transition('budget-list => create-budget', animate(200, forwardAnimation)),
      transition('create-budget => budget-list', animate(200, backAnimation)),
      transition('budget-list => budgeting', animate(200, forwardAnimation)),
      transition('budgeting => budget-list', animate(200, backAnimation)),
      transition('budgeting => transactions', animate(200, forwardAnimation)),
      transition('transactions => budgeting', animate(200, backAnimation)),
      transition('budgeting => add-transaction', animate(200, forwardAnimation)),
      transition('add-transaction => budgeting', animate(200, backAnimation)),
    ])
  ]
})
export class AppComponent implements OnInit {

  pageName$: any;

  constructor(private store: Store<AppState>) {
    this.pageName$ = this.store.select(currentAnimationStateSelector);
  }

  ngOnInit() {
  }
}
