import { Observable } from 'rxjs/Observable';
import { totalBudgetPieDataSelector, monthlyBudgetPieDataSelector } from './../../../selectors/selectors';
import { AppState } from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { PieData } from './../../../components/pie/pie.interface';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'yb-budgeting-page-left-nav',
  templateUrl: './budgeting-page-left-nav.component.html',
  styleUrls: ['./budgeting-page-left-nav.component.css']
})
export class BudgetingPageLeftNavComponent implements OnInit {

  totalBudgetPieData$: Observable<PieData[]>;
  monthlyBudgetPieData$: Observable<PieData[]>;

  renderPie: EventEmitter<any> = new EventEmitter<any>();
  renderPie2: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.totalBudgetPieData$ = this.store.select(totalBudgetPieDataSelector);
    this.monthlyBudgetPieData$ = this.store.select(monthlyBudgetPieDataSelector);

    this.totalBudgetPieData$.subscribe(n => {
      console.log(n);
      this.renderPie.emit(n);
    });

    this.monthlyBudgetPieData$.subscribe(n => {
      this.renderPie2.emit(n);
    });
  }
}
