import { Observable } from 'rxjs/Observable';
import { totalBudgetPieDataSelector, monthlyBudgetPieDataSelector } from './../../../selectors/selectors';
import { AppState } from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { PieData } from './../../../components/pie/pie.interface';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'yb-budgeting-page-right-nav',
  templateUrl: './budgeting-page-right-nav.component.html',
  styleUrls: ['./budgeting-page-right-nav.component.css']
})
export class BudgetingPageRightNavComponent implements OnInit {

  yearlyBudgetPieData$: Observable<PieData[]>;
  monthlyBudgetPieData$: Observable<PieData[]>;

  renderPie: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.yearlyBudgetPieData$ = this.store.select(totalBudgetPieDataSelector);
    this.monthlyBudgetPieData$ = this.store.select(monthlyBudgetPieDataSelector);

    this.yearlyBudgetPieData$.subscribe(n => {
      this.renderPie.emit();
    })
  }




}
