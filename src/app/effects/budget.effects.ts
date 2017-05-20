import { Budget, Category, Transaction } from './../models/interfaces';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Database } from '@ngrx/db';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/operator/toArray';

@Injectable()
export class BudgetEffects {


  // We want to open the db
  // We want to pull out the budgets and put them into the store
  // 

  @Effect()
  openDB$: Observable<any> = defer(() => {
    return this.db.open('budget-db')
      .mergeMap(() => {
        return this.db.query('budget', n => true);
      })
      .toArray()
      .map((budgets) => ({
        type: 'LOAD_BUDGET_COMPLETE',
        payload: budgets
      }));
  });

  @Effect()
  budget$: Observable<Action> = this.actions$
    .ofType('ADD_BUDGET')
    .map(toPayload)
    .mergeMap((budget: Budget) => {

      // insert does inserts and updates
      return this.db.insert('budget', [budget])
        .map((response: any) => ({
          type: 'ADD_BUDGET_COMPLETE',
          payload: response
        }));

      // TODO handle catches
      // .catch();
    });

  @Effect()
  category$: Observable<Action> = this.actions$
    .ofType('ADD_CATEGORY')
    .map(toPayload)
    .mergeMap((category: Category) => {

      // insert does inserts and updates
      return this.db.insert('category', [category])
        .map((response: any) => ({
          type: 'ADD_CATEGORY_COMPLETE',
          payload: response
        }));

      // TODO handle catches
      // .catch();
    });

  @Effect()
  transaction$: Observable<Action> = this.actions$
    .ofType('ADD_TRANSACTION')
    .map(toPayload)
    .mergeMap((transaction: Transaction) => {

      // insert does inserts and updates
      return this.db.insert('transaction', [transaction])
        .map((response: any) => ({
          type: 'ADD_TRANSACTION_COMPLETE',
          payload: response
        }));

      // TODO handle catches
      // .catch();
    });
  constructor(private actions$: Actions, private db: Database) { }
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
