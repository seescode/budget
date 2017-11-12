import { Subscription } from 'rxjs/Subscription';
import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { subcategoriesForSelectedCategorySelector, selectionSelector } from './../../selectors/selectors';
import { Router } from '@angular/router';
import { Budget, Category, Transaction } from './../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BACK_TO_BUDGETING } from '../../actions/actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'yb-add-transaction-page',
  templateUrl: './add-transaction-page.component.html',
  styleUrls: ['./add-transaction-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTransactionPageComponent implements OnInit, OnDestroy {
  subcategories$: Observable<string[]>;
  selectionSubscription: Subscription;
  transaction: FormGroup;
  selection: any;

  constructor(private store: Store<AppState>, private router: Router,
    private actions: ActionsCreatorService) {

    this.transaction = new FormGroup({
      selectedSubcategory: new FormControl(null, [Validators.required]),
      transactionAmount: new FormControl(null, [Validators.required, this.validAmount])
    });
  }

  ngOnInit() {
    this.selectionSubscription = this.store.select(selectionSelector)
      .subscribe(selection => {
        this.selection = selection;
      });
    this.subcategories$ = this.store.select(subcategoriesForSelectedCategorySelector);
  }

  ngOnDestroy() {
    this.selectionSubscription.unsubscribe();
  }

  validAmount(control: FormControl): { [s: string]: boolean } {

    if (control.value && control.value.match(/^\d+\.?\d?\d?$/)) {
      return null;
    }

    return { 'invalidNumber': true };
  }

  addTransaction() {
    const inputs = this.transaction.value;

    const transaction: Transaction = {
      name: inputs.selectedSubcategory.toLowerCase(),
      categoryName: this.selection.categoryId,
      amount: parseFloat(inputs.transactionAmount)
    };

    this.store.dispatch(this.actions.addTransaction(
      transaction, this.selection.budgetId, this.selection.year, this.selection.month
    ));

    this.router.navigate(['/budgeting', this.selection.budgetId, this.selection.year, this.selection.month]);
  }

  back() {
    this.store.dispatch({
      type: BACK_TO_BUDGETING
    });
  }
}
