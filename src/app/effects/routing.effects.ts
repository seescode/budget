import { Router } from '@angular/router';
import { selectionSelector } from './../selectors/selectors';
//import { categoryTransactionsSelector, budgetSelector, transactionSelector } from './../selectors/selectors';

import { budgetSelector, transactionSelector } from '../selectors/selectors';
import {
  LOAD_BUDGET, LOAD_BUDGET_COMPLETE, LOAD_BUDGET_DATA, LOAD_BUDGET_DATA_FROM_CACHE,
  LOAD_BUDGET_DATA_COMPLETE, ADD_BUDGET, ADD_BUDGET_COMPLETE,
  ADD_TRANSACTION_COMPLETE, ADD_TRANSACTION, REMOVE_TRANSACTION_COMPLETE,
  REMOVE_TRANSACTION, REMOVE_BUDGET, REMOVE_BUDGET_COMPLETE, BACK_TO_BUDGETING
} from './../actions/actions';
import { AppState } from './../reducers/index';
import { Budget, Transaction, Loaded } from './../models/interfaces';


import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Database } from '@ngrx/db';
import { defer } from 'rxjs/observable/defer';


@Injectable()
export class RoutingEffects {

  @Effect({ dispatch: false }) backToBudgetList$ = this.actions$
    .ofType(BACK_TO_BUDGETING)
    .withLatestFrom(this.store.select(selectionSelector))
    .do(([action, selection]: [any, any]) => {
      this.router.navigate(['/budgeting', selection.budgetId, selection.year,
        selection.month]);
    });

  constructor(private actions$: Actions, private db: Database, private store: Store<AppState>,
    private router: Router) { }
}

