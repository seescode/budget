import { Budget, ActiveDate } from './../../models/interfaces';
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'yb-budget-header',
  templateUrl: './budget-header.html',
  styleUrls: ['./budget-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetHeaderComponent {
  @Input() budgetAmount: number;
  @Input() activeDate: ActiveDate;
  @Input() remainingTotalBudget: number;
  @Input() remainingMonthlyBudget: number;
  @Input() spentInTotal: number;
  @Input() spentThisMonth: number;
  @Input() getRunningSurplus: number;

}
