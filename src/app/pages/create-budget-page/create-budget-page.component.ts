import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { Router } from '@angular/router';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Budget } from './../../models/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'yb-create-budget-page',
  templateUrl: './create-budget-page.component.html',
  styleUrls: ['./create-budget-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBudgetPageComponent {
  budget: FormGroup;

  constructor(private store: Store<AppState>, private router: Router,
    private actions: ActionsCreatorService) {

    // Great article on reactive forms:
    // https://toddmotto.com/reactive-formgroup-validation-angular-2
    this.budget = new FormGroup({
      budgetName: new FormControl(null, [Validators.required]),
      budgetAmount: new FormControl(null, [this.positiveNumber]),
      budgetDate: new FormGroup({
        budgetStartDate: new FormControl(null),
        budgetEndDate: new FormControl(null)
      }, this.endDateIsAfterStartDate.bind(this))
    });
  }

  addBudget() {
    const inputs = this.budget.value;
    const startDate = this.getMomentDate(inputs.budgetDate.budgetStartDate);
    const endDate = this.getMomentDate(inputs.budgetDate.budgetEndDate);

    this.store.dispatch(this.actions.addBudget(inputs.budgetName, '',
      parseFloat(inputs.budgetAmount), startDate.toDate(), endDate.toDate()));

    this.manageBudgets();
  }

  positiveNumber(control: FormControl): { [s: string]: boolean } {

    if (control.value && control.value.match(/^\d+\.?\d?\d?$/)) {
      return null;
    }

    return { 'invalidNumber': true };
  }

  getMomentDate(budgetDate: any) {
    const parsedDate = budgetDate.split('-');
    return moment([parsedDate[0], parsedDate[1] - 1]);
  }

  endDateIsAfterStartDate(control: AbstractControl): { [key: string]: boolean } {

    const budgetStartDate = control.get('budgetStartDate').value;
    const budgetEndDate = control.get('budgetEndDate').value;

    if (budgetStartDate == null || budgetEndDate == null) {
      return { 'startDateIsAfterEndDate': true };
    }

    const startDate = this.getMomentDate(budgetStartDate);
    const endDate = this.getMomentDate(budgetEndDate);

    if (startDate.isAfter(endDate)) {
      return { 'startDateIsAfterEndDate': true };
    }

    return null;
  };

  manageBudgets() {
    this.router.navigateByUrl('/budget-list');
  }
}
