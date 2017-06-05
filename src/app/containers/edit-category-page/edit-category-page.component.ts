import { ActivatedRoute, Router } from '@angular/router';
import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { REMOVE_TRANSACTION } from './../../actions/actions';
import { categoryTransactionsSelector } from './../../selectors/selectors';
import { Store } from '@ngrx/store';
import { AppState } from './../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './../../models/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'yb-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryPageComponent implements OnInit {

  // TODO: must hook this up to the store
  transactions: Observable<Transaction[]>;
  categoryId: string;

  constructor(private store: Store<AppState>, private actionCreators: ActionsCreatorService,
    private activatedRoute: ActivatedRoute, private location: Location) {
    this.transactions = this.store.select(categoryTransactionsSelector);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['categoryId'];
    });
  }

  removeTransaction(transaction: Transaction) {
    const action = this.actionCreators.removeTransaction(transaction);
    this.store.dispatch(action);
  }

  removeCategory() {
    const action = this.actionCreators.removeCategory(this.categoryId);
    this.store.dispatch(action);

    // need to get the budgetId, year, month from categoryId.  Uh oh, 
    // year and month can't be inferred. 

    this.location.back();
    // this.router.navigate(['/budgeting', 'e9b7debf-8fd0-5723-88d2-eea181368bef', '2017', '6']);
  }

  back() {
    this.location.back();
  }
}
