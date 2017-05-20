import { Router } from '@angular/router';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Budget } from './../../models/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-create-budget-page',
  templateUrl: './create-budget-page.component.html',
  styleUrls: ['./create-budget-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBudgetPageComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }

  create() {
    // build a mock budget object and then dispatch to the store with this information
    const newBudget: Budget = {
      id: 1,
      name: 'budget 1',
      details: 'Japan trip',
      budgetAmount: 7000,
      startDate: new Date(),
      endDate: new Date(2017, 6, 1)
    };

    this.store.dispatch({
      type: 'ADD_BUDGET',
      payload: newBudget
    });

    this.router.navigateByUrl('/budget-list');
  }
}
