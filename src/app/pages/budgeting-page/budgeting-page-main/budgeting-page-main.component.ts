import { environment } from './../../../../environments/environment.prod';
import {
  everyCategoryTotalSelector, totalBudgetInfoSelector,
  monthlyBudgetInfoSelector, runningSurplusSelector
} from './../../../selectors/selectors';
import { Subscription } from 'rxjs/Subscription';
import { Category, ActiveDate, TotalBudgetInfo, Transaction } from './../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { ActionsCreatorService } from './../../../actions/actionsCreatorService';
import { REMOVE_TRANSACTION, ADD_TRANSACTION } from './../../../actions/actions';


import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from './../../../reducers/index';
import { Store, Action } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'yb-budgeting-page-main',
  templateUrl: './budgeting-page-main.component.html',
  styleUrls: ['./budgeting-page-main.component.css']
})
export class BudgetingPageMainComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;
  routeSubscription: Subscription;

  selectedMonthAndYear: ActiveDate;

  budgetId: string;
  totalBudgetInfo: TotalBudgetInfo;
  monthlyBudgetInfo: any;
  selectedCategoryId: string;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute,
    private router: Router, private actionsCreatorService: ActionsCreatorService,
    private snackBar: MdSnackBar, private actionCreators: ActionsCreatorService, ) {
    this.categories$ = this.store.select(everyCategoryTotalSelector);

  }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      console.log('route change');
      this.budgetId = params['budgetId'];

      this.selectedMonthAndYear = {
        month: parseInt(params['month']),
        year: parseInt(params['year'])
      };

      this.selectedCategoryId = params['category'];

      this.store.dispatch(this.actionsCreatorService.loadBudgetData(this.budgetId));
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  addTransaction(transaction: Transaction) {
    const action = this.actionsCreatorService.addTransaction(transaction,
      this.budgetId, this.selectedMonthAndYear.year, this.selectedMonthAndYear.month);

    this.store.dispatch(action);

    this.openSnackbar(action, 'Added Transaction', REMOVE_TRANSACTION);
  }

  openSnackbar(action: Action, message: string, undoType: string) {
    const instance = this.snackBar.open(message, 'Undo', {
      duration: environment.snackBarDuration
    });

    const onActionSubscription = instance.onAction().subscribe(() => {
      const undoTransaction = {
        ...action,
        type: undoType
      };

      this.store.dispatch(undoTransaction);
    });

    const onAfterDismissedSubscription = instance.afterDismissed().subscribe(() => {
      // Cleanup subscriptions
      onActionSubscription.unsubscribe();
      onAfterDismissedSubscription.unsubscribe();
    });
  }

  editCategory(categoryId: string) {

    if (this.selectedCategoryId === categoryId) {
      // Toggle off the selected category
      this.router.navigate(['/budgeting', this.budgetId, this.selectedMonthAndYear.year,
        this.selectedMonthAndYear.month]);
    } else {
      this.router.navigate(['/budgeting', this.budgetId, this.selectedMonthAndYear.year,
        this.selectedMonthAndYear.month, {
          category: categoryId
        }]);
    }
  }

  removeTransaction(transaction: Transaction) {
    const action = this.actionCreators.removeTransaction(transaction);
    this.store.dispatch(action);

    this.openSnackbar(action, 'Removed Transaction', ADD_TRANSACTION);
  }

  removeCategory(categoryId: string) {
    const action = this.actionCreators.removeCategory(categoryId);
    this.store.dispatch(action);

    //TODO: remove the category for the url if it's the same one that got deleted
  }

}
