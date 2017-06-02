import { ActionsCreatorService } from './../../../actions/actionsCreatorService';
import { budgetSelector } from './../../../selectors/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Budget } from './../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yb-budgeting-page-left-nav',
  templateUrl: './budgeting-page-left-nav.component.html',
  styleUrls: ['./budgeting-page-left-nav.component.css']
})
export class BudgetingPageLeftNavComponent implements OnInit {

  budgets$: Observable<Budget[]>;
  budgetId: string;

  constructor(private store: Store<AppState>, private router: Router,
    private actionsCreatorService: ActionsCreatorService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.budgets$ = this.store.select(budgetSelector);

    this.activatedRoute.params.subscribe(params => {
      this.budgetId = params['budgetId'];
    });

  }

  openBudget(budgetId: string) {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    this.router.navigate(['/budgeting', budgetId, year, month + 1]);
  }

  addCategory(categoryName: any) {
    console.log('what is happening');
    this.store.dispatch(this.actionsCreatorService
      .addCategory(categoryName.name, this.budgetId));
  }
}
