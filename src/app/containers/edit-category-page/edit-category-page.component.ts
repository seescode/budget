import { categoryTransactionsSelector } from './../../selectors/selectors';
import { Store } from '@ngrx/store';
import { AppState } from './../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './../../models/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryPageComponent implements OnInit {

  // TODO: must hook this up to the store
  transactions: Observable<Transaction[]>;

  constructor(private store: Store<AppState>) {
    this.transactions = this.store.select(categoryTransactionsSelector);
  }

  ngOnInit() {
  }

  removeTransaction(transactionId: string) {
    // todo must dispatch to remove transaction
  }

}
