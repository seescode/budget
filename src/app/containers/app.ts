import { ActiveDate, Budget } from './../models/interfaces';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';


@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div>
    <h1>Hello Budget World</h1>
    <budget-header [budgetAmount]="budgetAmount$" [activeDate]="selectedMonthAndYear$"
      [remainingYearlyBudget]="remainingYearlyBudget$"
      [remainingMonthlyBudget]="remainingMonthlyBudget$"
      [spentThisYear]="spentThisYear$"
      [spentThisMonth]="spentThisMonth$"
      [getRunningSurplus]="getRunningSurplus$"
      (previous)="previousMonth($event)" 
      (next)="nextMonth($event)"></budget-header>
  </div>
  `
})
export class AppComponent {

  budgetAmount$: number = 40000;
  //categories$: Observable<any>;
  remainingYearlyBudget$: number = 10000;
  remainingMonthlyBudget$: number = 2000;
  selectedMonthAndYear$: ActiveDate = {
    month: 5,
    year: 2017
  };
  spentThisYear$: number = 30000;
  spentThisMonth$: number = 1000;
  getRunningSurplus$: number = 200;

  constructor() {
  }

  previousMonth() {

  }
  nextMonth() {

  }
}
