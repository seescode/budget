import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getTotalGraph } from '../../selectors/selectors';

@Component({
  selector: 'yb-total-graph',
  templateUrl: 'total-graph.html'
})
export class TotalGraphComponent {


  // single: any[] = [
  //   {
  //     "name": "Spent: $1102.05",
  //     "value": 1102.05
  //   },
  //   {
  //     "name": "Remaining: $2000.50",
  //     "value": 2000.50
  //   },
  //   {
  //     "name": "Surplus: $2000.50",
  //     "value": 2000.50
  //   }    
  // ];
  // multi: any[];

  // options

  colorScheme = {
    domain: ['#a8385d', '#a27ea8', '#aae3f5']
  };

  data$: Observable<any>;

  constructor(public store: Store<AppState>) {
    this.data$ = store.select(getTotalGraph);
  }

  onSelect() {
  }
}
