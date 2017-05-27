import { Router } from '@angular/router';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Budget } from './../../models/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UUID } from 'angular2-uuid';

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
      id: UUID.UUID(),
      name: 'budget 2',
      details: 'Standard',
      budgetAmount: 12000,
      startDate: new Date(2017, 0, 1),
      endDate: new Date(2017, 11, 12)
    };

    this.store.dispatch({
      type: 'ADD_BUDGET',
      payload: newBudget
    });

    this.router.navigateByUrl('/budget-list');
  }
}
