import { Budget, ActiveDate } from './../models/interfaces';
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'budget-header',
  template: `
  <div>
    <h1><span (click)="previous.emit()">&lt;&lt;</span> {{activeDate.month}} {{activeDate.year}} <span (click)="next.emit()">&gt;&gt;</span></h1>
    <div [class.red]="remainingYearlyBudget < 0">
      Yearly budget: {{budgetAmount | currency:'USD':true:'1.2-2'}} = 
      {{remainingYearlyBudget | currency:'USD':true:'1.2-2'}} unspent + 
      {{spentThisYear | currency:'USD':true:'1.2-2'}} spent
    </div>
    <div [class.red]="remainingMonthlyBudget < 0">
      Monthly budget: {{budgetAmount / 12 | currency:'USD':true:'1.2-2'}} = 
      {{remainingMonthlyBudget | currency:'USD':true:'1.2-2'}} unspent + 
      {{spentThisMonth | currency:'USD':true:'1.2-2'}} spent
    </div>
    <div>
      Running surplus: {{getRunningSurplus | currency:'USD':true:'1.2-2'}}
    </div>
  </div>
  `,
  styles: [ '.red { color: red }'],  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetHeaderComponent {
  /**
   * Dumb components receieve data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'dumb' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   *
   * Tip: Utilize getters to keep templates clean in 'dumb' components.
   */
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
