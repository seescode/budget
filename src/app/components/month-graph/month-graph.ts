import { getMonthGraph } from './../../selectors/selectors';
import { AppState } from './../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'yb-month-graph',
  templateUrl: 'month-graph.html'
})
export class MonthGraphComponent {


  // single: any[] = [
  //   {
  //     "name": "Spent: $1102.05",
  //     "value": 1102.05
  //   },
  //   {
  //     "name": "Remaining: $2000.50",
  //     "value": 2000.50
  //   }
  // ];

  // options
  //showXAxis = true;
  //gradient = false;
  //xAxisLabel = '';
 
  //showLegend = false;
  colorScheme = {
    domain: ['#a8385d', '#a27ea8']
  };

  data$: Observable<any>;

  constructor(public store: Store<AppState>) {
    this.data$ = store.select(getMonthGraph)
  }
  
  onSelect() {
  }  
}
