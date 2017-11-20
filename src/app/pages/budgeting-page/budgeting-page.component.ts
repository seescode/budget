import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { Subscription } from 'rxjs/Subscription';
import {
  getSelectedBudgetName, categoriesForCurrentBudget, getMonthData
} from './../../selectors/selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from './../../reducers/index';
import { ActiveDate, Budget, Transaction, Category, TotalBudgetInfo } from './../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

@Component({
  selector: 'yb-budgeting-page',
  templateUrl: './budgeting-page.component.html',
  styleUrls: ['./budgeting-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetingPageComponent implements OnInit, OnDestroy {

  routeSubscription: Subscription;
  leftNavDisplayMode: string;
  rightNavDisplayMode: string;
  leftNavOpened: string;
  rightNavOpened: string;
  selectedMonthAndYear: ActiveDate;
  budgetId: string;
  selectedBudgetName: Observable<string>;
  categories$: Observable<any>;
  monthData$: Observable<any[]>;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute,
    private router: Router, private actionsCreatorService: ActionsCreatorService) {
    this.selectedBudgetName = store.select(getSelectedBudgetName);

    this.categories$ = this.store.select(categoriesForCurrentBudget);
    this.monthData$ = this.store.select(getMonthData);
  }

  ngOnInit() {

    // TODO: is this actually being used?  If not remove this window nonsense
    const width = window.innerWidth;
    // this.resizeScreen(width);

    // TODO: move this code to a selector
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.budgetId = params['budgetId'];

      this.selectedMonthAndYear = {
        month: parseInt(params['month']),
        year: parseInt(params['year'])
      };

      this.selectedMonthAndYear.fullMonth = moment.months(this.selectedMonthAndYear.month - 1);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onCountoEnd() {

  }

  previousMonth() {
    // TODO: Instead of doing an explicit router.navigate try and use 
    // a store dispatch to update the url.  That way the reducer would 
    // contain the code to calculate previous and next month. 
    // Alternatively you could have the router.navigate happen in a side
    // effect.
    let month = this.selectedMonthAndYear.month - 1;
    let year = this.selectedMonthAndYear.year;

    if (month === 0) {
      year--;
      month = 12;
    }

    this.router.navigate(['/budgeting', this.budgetId, year, month]);
  }

  nextMonth() {
    let month = this.selectedMonthAndYear.month + 1;
    let year = this.selectedMonthAndYear.year;

    if (month > 12) {
      year++;
      month = 1;
    }

    this.router.navigate(['/budgeting', this.budgetId, year, month]);
  }

  addTransaction(category: string) {
    this.router.navigate(['/budgeting', this.budgetId, this.selectedMonthAndYear.year,
      this.selectedMonthAndYear.month, category.toLowerCase()]);
  }

  viewTransactionList(category: string) {
    this.router.navigate(['/transactions', this.budgetId, this.selectedMonthAndYear.year,
      this.selectedMonthAndYear.month, category.toLowerCase()]);
  }

  back() {
    this.router.navigateByUrl('/budget-list');
  }

}
