import { forwardAnimation, backAnimation } from './../../animations/key-frames';
import { currentAnimationStateSelector } from './../../selectors/selectors';
import { AppState } from './../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { trigger, state, style, transition, animate, keyframes, query } from '@angular/animations';




@Component({
  selector: 'yb-app',
  template: `<main [@pageAnimations]="pageName$ | async">
              <router-outlet></router-outlet>
            </main>`,
  animations: [
    trigger('pageAnimations', [
      transition('budget-list => create-budget', forwardAnimation),
      transition('create-budget => budget-list', backAnimation),
      transition('budget-list => budgeting', forwardAnimation),
      transition('budgeting => budget-list', backAnimation),
      transition('budgeting => transactions', forwardAnimation),
      transition('transactions => budgeting', backAnimation),
      transition('budgeting => add-transaction', forwardAnimation),
      transition('add-transaction => budgeting', backAnimation),
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
