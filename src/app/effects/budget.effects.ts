import { LOAD_BUDGET, LOAD_BUDGET_COMPLETE, LOAD_BUDGET_DATA, LOAD_BUDGET_DATA_FROM_CACHE,
    LOAD_BUDGET_DATA_COMPLETE, ADD_BUDGET, ADD_BUDGET_COMPLETE, ADD_CATEGORY,
    ADD_CATEGORY_COMPLETE, ADD_TRANSACTION_COMPLETE, ADD_TRANSACTION } from './../actions/actions';
import { AppState } from './../reducers/index';
import { Budget, Category, Transaction, Loaded } from './../models/interfaces';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Database } from '@ngrx/db';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/from';

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

      return this.db.query('category', n => n.budgetId === budgetId)
        .toArray()
        .mergeMap((categories: Category[]) => {
          return this.db.query('transaction', n => n.budgetId === budgetId)
            .toArray()
            .map((transactions: Transaction[]) => ({
              type: LOAD_BUDGET_DATA_COMPLETE,
              payload: {
                budgetId: budgetId,
                categories: categories,
                transactions: transactions
              }
            }));
        });
    });
  // TODO handle catches
  // .catch();

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
  category$: Observable<Action> = this.actions$
    .ofType(ADD_CATEGORY)
    .map(toPayload)
    .mergeMap((category: Category) => {

      // insert does inserts and updates
      return this.db.insert('category', [category])
        .map((response: any) => ({
          type: ADD_CATEGORY_COMPLETE,
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
  constructor(private actions$: Actions, private db: Database, private store: Store<AppState>) { }
}


    //     db.open('budget');

    //insert does inserts and updates
    //  this.db.insert('transaction', [transaction])
    //    .subscribe(n => console.log(n));


    //this does deletes
    // this.db.executeWrite('transaction', 'delete', [ somePrimaryKeyId])
    //   .subscribe(n => console.log(n));

    //this does a simple get by id
    //this.db.get('transaction', 'aa')
    //  .subscribe((n: Transaction) => alert(n.amount));

    //this does a get based on a query 
    // this.db.query('transaction', n => n.amount == 3 )
    //   .subscribe(x => console.log(x));
