import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { subcategoriesForSelectedCategorySelector } from './../../selectors/selectors';
import { Router } from '@angular/router';
import { Budget, Category } from './../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-add-transaction-page',
  templateUrl: './add-transaction-page.component.html',
  styleUrls: ['./add-transaction-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTransactionPageComponent implements OnInit {
  subcategories$ : Observable<string[]>;

  constructor(private store: Store<AppState>, private router: Router,
    private actionsCreatorService: ActionsCreatorService) { }

  ngOnInit() {
    this.subcategories$  = this.store.select(subcategoriesForSelectedCategorySelector);
  }

  addTransaction() {
    // const inputs = this.transaction.value;

    // const transaction: Transaction = {
    //   name: inputs.selectedSubcategory.toLowerCase(),
    //   categoryName: this.categoryId,
    //   amount: parseFloat(inputs.transactionAmount)
    // };

    // this.store.dispatch(this.actions.addTransaction(
    //   transaction, this.budgetId, this.year, this.month
    // ))

    // this.navCtrl.pop();
  }
}
