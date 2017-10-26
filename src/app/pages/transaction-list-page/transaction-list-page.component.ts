import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { budgetSelector, categoryTransactionsSelector } from './../../selectors/selectors';
import { Router } from '@angular/router';
import { Budget } from './../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BACK_TO_BUDGETING } from '../../actions/actions';

@Component({
  selector: 'yb-transaction-list-page',
  templateUrl: './transaction-list-page.component.html',
  styleUrls: ['./transaction-list-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListPageComponent {

  transactions$: Observable<any>;

  constructor(private store: Store<AppState>, private actions: ActionsCreatorService) {
    this.transactions$ = this.store.select(categoryTransactionsSelector);
  }

  deleteTransaction(transaction: any) {
    this.store.dispatch(this.actions.removeTransaction(transaction));
  }

  back() {
    this.store.dispatch({
      type: BACK_TO_BUDGETING
    });
  }
}
