//import { categoryTransactionsSelector, budgetSelector, transactionSelector } from './../selectors/selectors';

import { budgetSelector, transactionSelector } from '../selectors/selectors';
import {
  LOAD_BUDGET, LOAD_BUDGET_COMPLETE, LOAD_BUDGET_DATA, LOAD_BUDGET_DATA_FROM_CACHE,
  LOAD_BUDGET_DATA_COMPLETE, ADD_BUDGET, ADD_BUDGET_COMPLETE,
  ADD_TRANSACTION_COMPLETE, ADD_TRANSACTION, REMOVE_TRANSACTION_COMPLETE,
  REMOVE_TRANSACTION, REMOVE_BUDGET, REMOVE_BUDGET_COMPLETE
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
export class BudgetEffects {

  @Effect()
  openDB$: Observable<Action> = this.actions$
    .ofType(LOAD_BUDGET)
    .startWith({
      type: LOAD_BUDGET
    })
    .map(toPayload)
    .mergeMap(() => {
      return this.db.open('budget-db')
        .mergeMap(() => {
          return this.db.query('budget', n => true);
        })
        .toArray()
        .map((budgets) => ({
          type: LOAD_BUDGET_COMPLETE,
          payload: budgets
        }));
    });

  @Effect()
  budgetData$: Observable<Action> = this.actions$
    .ofType(LOAD_BUDGET_DATA)
    .map(toPayload)
    .withLatestFrom(this.store.select(s => s.budgetLoaded))
    .mergeMap(([budgetId, budgetLoaded]: [string, Loaded]) => {

      if (budgetLoaded.loadedBudgetIds.find(bId => bId === budgetId) != null) {
        return Observable.from([{
          type: LOAD_BUDGET_DATA_FROM_CACHE
        }]);
      }

      return this.db.query('transaction', n => n.budgetId === budgetId)
        .toArray()
        .map((transactions: Transaction[]) => ({
          type: LOAD_BUDGET_DATA_COMPLETE,
          payload: {
            budgetId: budgetId,
            transactions: transactions
          }
        }));
    });
  //TODO handle catches
  //.catch();

  @Effect()
  budget$: Observable<Action> = this.actions$
    .ofType(ADD_BUDGET)
    .map(toPayload)
    .mergeMap((budget: Budget) => {

      // insert does inserts and updates
      return this.db.insert('budget', [budget])
        .map((response: any) => ({
          type: ADD_BUDGET_COMPLETE,
          payload: response
        }));

      // TODO handle catches
      // .catch();
    });

  @Effect()
  transaction$: Observable<Action> = this.actions$
    .ofType(ADD_TRANSACTION)
    .map(toPayload)
    .mergeMap((transaction: Transaction) => {

      // insert does inserts and updates
      return this.db.insert('transaction', [transaction])
        .map((response: any) => ({
          type: ADD_TRANSACTION_COMPLETE,
          payload: response
        }));

      // TODO handle catches
      // .catch();
    });

  @Effect()
  removeTransaction$: Observable<Action> = this.actions$
    .ofType(REMOVE_TRANSACTION)
    .map(toPayload)
    .mergeMap((transaction: Transaction) => {

      return this.db.executeWrite('transaction', 'delete', [transaction.id])
        .map((response: any) => ({
          type: REMOVE_TRANSACTION_COMPLETE,
          payload: transaction
        }));

      // TODO handle catches
      // .catch();
    });

  @Effect()
  removeBudget$: Observable<Action> = this.actions$
    .ofType(REMOVE_BUDGET)
    .map(toPayload)
    .withLatestFrom(this.store.select(budgetSelector),
    this.store.select(transactionSelector))
    .mergeMap(([budgetId, budgets, transactions]:
      [string, Budget[], Transaction[]]) => {

      const transactionIds = transactions
        .filter(trans => trans.budgetId === budgetId)
        .map(trans => trans.id);

      if (transactionIds.length === 0) {
        return this.db.executeWrite('budget', 'delete', [budgetId])
          .mapTo({
            type: REMOVE_BUDGET_COMPLETE,
            payload: budgetId
          });
      }

      return Observable.forkJoin(
        this.db.executeWrite('transaction', 'delete', transactionIds),
        this.db.executeWrite('budget', 'delete', [budgetId])
      )
        .mapTo({
          type: REMOVE_BUDGET_COMPLETE,
          payload: budgetId
        });
    });

  constructor(private actions$: Actions, private db: Database, private store: Store<AppState>) { }
}



// TODO: delete these comments:
//     db.open('budget');

// insert does inserts and updates
//  this.db.insert('transaction', [transaction])
//    .subscribe(n => console.log(n));


// this does deletes
// this.db.executeWrite('transaction', 'delete', [ somePrimaryKeyId])
//   .subscribe(n => console.log(n));

// this does a simple get by id
// this.db.get('transaction', 'aa')
//  .subscribe((n: Transaction) => alert(n.amount));

// this does a get based on a query
// this.db.query('transaction', n => n.amount == 3 )
//   .subscribe(x => console.log(x));
