import { Subscription } from 'rxjs/Subscription';
import { everyCategoryTotalSelector, totalBudgetInfoSelector, monthlyBudgetInfoSelector } from './../../selectors/selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { AppState } from './../../reducers/index';
import { ActiveDate, Budget, Transaction, Category, TotalBudgetInfo } from './../../models/interfaces';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'yb-budgeting-page',
  templateUrl: './budgeting-page.component.html',
  styleUrls: ['./budgeting-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetingPageComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;

  selectedMonthAndYear$: ActiveDate;
  getRunningSurplus$: number = 200;

  budgetId: string;
  totalBudgetInfoSubscription: Subscription;
  totalBudgetInfo: TotalBudgetInfo;
  monthlyBudgetInfoSubscription: Subscription;
  monthlyBudgetInfo: any;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.categories$ = this.store.select(everyCategoryTotalSelector);
    this.totalBudgetInfoSubscription = this.store.select(totalBudgetInfoSelector)
      .subscribe(info => {
        this.totalBudgetInfo = info;
      });

    this.monthlyBudgetInfoSubscription = this.store.select(monthlyBudgetInfoSelector)
      .subscribe(info => {
        this.monthlyBudgetInfo = info;
      });
  }

  ngOnInit() {

    // TODO should unsubscribe in ngDestroy
    this.activatedRoute.params.subscribe(params => {
      this.budgetId = params['budgetId'];

      this.selectedMonthAndYear$  = {
        month: parseInt(params['month']),
        year: parseInt(params['year'])
      };

      this.store.dispatch({
        type: 'LOAD_BUDGET_DATA',
        payload: this.budgetId
      });
    });
  }

  previousMonth() {
    let month = this.selectedMonthAndYear$.month - 1;
    let year = this.selectedMonthAndYear$.year;

    if (month === 0) {
      year--;
      month = 12;
    }

    this.router.navigate(['/budgeting', this.budgetId, year, month]);
  }
  nextMonth() {
    let month = this.selectedMonthAndYear$.month + 1;
    let year = this.selectedMonthAndYear$.year;

    if (month > 12) {
      year++;
      month = 1;
    }

    this.router.navigate(['/budgeting', this.budgetId, year, month]);
  }

  addTransaction(transaction: Transaction) {

    transaction.id = UUID.UUID();
    transaction.budgetId = this.budgetId;
    transaction.timestamp = new Date();

    this.store.dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  addCategory(categoryName: any) {
    const newCategory: Category = {
        name: categoryName.name,
        id: UUID.UUID(),
        budgetId: this.budgetId
    };

    this.store.dispatch({
      type: 'ADD_CATEGORY',
      payload: newCategory
    });
  }

  ngOnDestroy() {
    this.totalBudgetInfoSubscription.unsubscribe();
    this.monthlyBudgetInfoSubscription.unsubscribe();
  }

}
