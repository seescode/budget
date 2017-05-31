import { everyCategoryTotalSelector, totalBudgetInfoSelector,
   monthlyBudgetInfoSelector, runningSurplusSelector } from './../../../selectors/selectors';
import { Subscription } from 'rxjs/Subscription';
import { Category, ActiveDate, TotalBudgetInfo, Transaction } from './../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { ActionsCreatorService } from './../../../actions/actionsCreatorService';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
    private router: Router, private actionsCreatorService: ActionsCreatorService) {
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

      this.selectedMonthAndYear$  = {
        month: parseInt(params['month']),
        year: parseInt(params['year'])
      };

      this.store.dispatch(this.actionsCreatorService.loadBudgetData(this.budgetId));
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
    const action = this.actionsCreatorService.addTransaction(transaction,
      this.budgetId, this.selectedMonthAndYear$.year, this.selectedMonthAndYear$.month);

    this.store.dispatch(action);
  }

  addCategory(categoryName: any) {
    this.store.dispatch(this.actionsCreatorService
      .addCategory(categoryName.name, this.budgetId));
  }

  ngOnDestroy() {
    this.totalBudgetInfoSubscription.unsubscribe();
    this.monthlyBudgetInfoSubscription.unsubscribe();
  }

}