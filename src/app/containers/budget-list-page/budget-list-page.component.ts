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

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.budgets$ = this.store.select(s => s.budget);
  }
}
