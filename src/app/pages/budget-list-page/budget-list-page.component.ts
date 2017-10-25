import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { budgetSelector } from './../../selectors/selectors';
import { Router } from '@angular/router';
import { Budget } from './../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-budget-list-page',
  templateUrl: './budget-list-page.component.html',
  styleUrls: ['./budget-list-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetListPageComponent implements OnInit {
  budgets$: Observable<Budget[]>;

  constructor(private store: Store<AppState>, private router: Router,
    private actionsCreatorService: ActionsCreatorService) { }

  ngOnInit() {
    this.budgets$ = this.store.select(budgetSelector);
  }

  openBudget(budgetId: string) {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();


    // TODO: remove me
    this.store.dispatch(this.actionsCreatorService.loadBudgetData(budgetId));

    this.router.navigate(['/budgeting', budgetId, year, month + 1]);
  }

  deleteBudget(budgetId: string) {
    this.store.dispatch(this.actionsCreatorService.removeBudget(budgetId));
  }

  importBudget() {

  }

  exportBudget(budgetId: string) {

  }
}
