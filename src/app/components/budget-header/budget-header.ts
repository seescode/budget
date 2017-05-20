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
  @Input() remainingYearlyBudget: number;
  @Input() remainingMonthlyBudget: number;
  @Input() spentThisYear: number;
  @Input() spentThisMonth: number;
  @Input() getRunningSurplus: number;
  @Output() previous: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();

}
