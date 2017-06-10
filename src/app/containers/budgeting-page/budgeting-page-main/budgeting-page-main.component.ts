import {
  everyCategoryTotalSelector, totalBudgetInfoSelector,
  monthlyBudgetInfoSelector, runningSurplusSelector
} from './../../../selectors/selectors';
import { Subscription } from 'rxjs/Subscription';
import { Category, ActiveDate, TotalBudgetInfo, Transaction } from './../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { ActionsCreatorService } from './../../../actions/actionsCreatorService';
import { REMOVE_TRANSACTION } from './../../../actions/actions';


import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'yb-budgeting-page-main',
  templateUrl: './budgeting-page-main.component.html',
  styleUrls: ['./budgeting-page-main.component.css']
})
export class BudgetingPageMainComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;

  selectedMonthAndYear$: ActiveDate;
  getRunningSurplus$: Observable<number>;

  budgetId: string;
  totalBudgetInfoSubscription: Subscription;
  totalBudgetInfo: TotalBudgetInfo;
  monthlyBudgetInfoSubscription: Subscription;
  monthlyBudgetInfo: any;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute,
    private router: Router, private actionsCreatorService: ActionsCreatorService,
    private snackBar: MdSnackBar) {
    this.categories$ = this.store.select(everyCategoryTotalSelector);
    this.totalBudgetInfoSubscription = this.store.select(totalBudgetInfoSelector)
      .subscribe(info => {
        this.totalBudgetInfo = info;
      });

    this.monthlyBudgetInfoSubscription = this.store.select(monthlyBudgetInfoSelector)
      .subscribe(info => {
        this.monthlyBudgetInfo = info;
      });

    this.getRunningSurplus$ = this.store.select(runningSurplusSelector);
  }

  ngOnInit() {
    // TODO should unsubscribe in ngDestroy
    this.activatedRoute.params.subscribe(params => {

      this.budgetId = params['budgetId'];

      this.selectedMonthAndYear$ = {
        month: parseInt(params['month']),
        year: parseInt(params['year'])
      };

      this.store.dispatch(this.actionsCreatorService.loadBudgetData(this.budgetId));
    });
  }

  addTransaction(transaction: Transaction) {
    const action = this.actionsCreatorService.addTransaction(transaction,
      this.budgetId, this.selectedMonthAndYear$.year, this.selectedMonthAndYear$.month);

    this.store.dispatch(action);

    const instance = this.snackBar.open('Added Transaction', 'Undo', {
      // TODO: this should be 5000 but to make e2e tests run faster I set to 500
      // There must be a way to have this be configurable to be shorter during a
      // e2e test.
      duration: 500,
    });

    const onActionSubscription = instance.onAction().subscribe(() => {
      const undoTransaction = {
        ...action,
        type: REMOVE_TRANSACTION
      };

      this.store.dispatch(undoTransaction);
    });

    const onAfterDismissedSubscription = instance.afterDismissed().subscribe(() => {
      // Cleanup subscriptions
      onActionSubscription.unsubscribe();
      onAfterDismissedSubscription.unsubscribe();
    });
  }

  editCategory(categoryName: string) {
    this.router.navigate(['/edit-category', categoryName]);
  }

  ngOnDestroy() {
    this.totalBudgetInfoSubscription.unsubscribe();
    this.monthlyBudgetInfoSubscription.unsubscribe();
  }
}
