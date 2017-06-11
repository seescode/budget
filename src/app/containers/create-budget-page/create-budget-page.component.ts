import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { Router } from '@angular/router';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Budget } from './../../models/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';


@Component({
  selector: 'yb-create-budget-page',
  templateUrl: './create-budget-page.component.html',
  styleUrls: ['./create-budget-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBudgetPageComponent implements OnInit {

  missingBudgetName = false;
  missingBudgetAmount = false;
  missingBudgetStart = false;
  missingBudgetFinish = false;
  budgetFinishIsBeforeBudgetStart = false;

  constructor(private store: Store<AppState>, private router: Router,
    private actionsCreatorService: ActionsCreatorService) { }

  ngOnInit() {
  }

  validateRequiredData(budgetName: string, details: string, budgetAmount: string, budgetStartDate: string, budgetEndDate: string) {
    if (budgetName == null || budgetName.trim() === '') {
      this.missingBudgetName = true;
    } else {
      this.missingBudgetName = false;
    }

    if (budgetAmount.trim() === '') {
      this.missingBudgetAmount = true;
    } else {
      this.missingBudgetAmount = false;
    }

    if (budgetStartDate.trim() === '') {
      this.missingBudgetStart = true;
    } else {
      this.missingBudgetStart = false;
    }

    if (budgetEndDate.trim() === '') {
      this.missingBudgetFinish = true;
    } else {
      this.missingBudgetFinish = false;
    }
  }

  validateStartDateIsBeforeEndDate(budgetStartDate: string, budgetEndDate: string) {

    const parsedBeginDate = budgetStartDate.split('-');
    const parsedEndDate = budgetEndDate.split('-');

    const startDate = moment([parsedBeginDate[0], parsedBeginDate[1]]);
    const endDate = moment([parsedEndDate[0], parsedEndDate[1]]);

    if (startDate.isAfter(endDate)) {
      this.budgetFinishIsBeforeBudgetStart = true;
    } else {
      this.budgetFinishIsBeforeBudgetStart = false;
    }
    return [startDate, endDate];
  }

  create(budgetName: string, details: string, budgetAmount: string, budgetStartDate: string, budgetEndDate: string) {

    this.validateRequiredData(budgetName, details, budgetAmount, budgetStartDate, budgetEndDate);

    let startDate, endDate;
    [startDate, endDate] = this.validateStartDateIsBeforeEndDate(budgetStartDate, budgetEndDate);

    if (this.missingBudgetName ||
      this.missingBudgetAmount ||
      this.missingBudgetStart ||
      this.missingBudgetFinish ||
      this.budgetFinishIsBeforeBudgetStart) {
      return;
    }

    const action = this.actionsCreatorService.addBudget(
      budgetName,
      details,
      parseInt(budgetAmount),
      startDate.toDate(),
      endDate.toDate()
    )

    this.store.dispatch(action);

    this.router.navigateByUrl('/budget-list');
  }
}
