import { Subscription } from 'rxjs/Subscription';
import { ActionsCreatorService } from './../../../actions/actionsCreatorService';
import { budgetSelector, categoriesForCurrentBudget } from './../../../selectors/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Budget, Category } from './../../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'yb-budgeting-page-right-nav',
  templateUrl: './budgeting-page-right-nav.component.html',
  styleUrls: ['./budgeting-page-right-nav.component.css']
})
export class BudgetingPageRightNavComponent implements OnInit, OnDestroy {

  budgets$: Observable<Budget[]>;
  budgetId: string;
  categoriesForCurrentBudgetSubscription: Subscription;
  categoriesForCurrentBudget: Category[];
  routeSubscription: Subscription;

  constructor(private store: Store<AppState>, private router: Router,
    private actionsCreatorService: ActionsCreatorService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.budgets$ = this.store.select(budgetSelector);


    this.categoriesForCurrentBudgetSubscription = this.store.select(categoriesForCurrentBudget)
      .subscribe(cat => this.categoriesForCurrentBudget = cat);

    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.budgetId = params['budgetId'];
    });
  }

  ngOnDestroy() {
    this.categoriesForCurrentBudgetSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  openBudget(budgetId: string) {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    this.router.navigate(['/budgeting', budgetId, year, month + 1]);
  }

  addCategory(categoryName: Category) {

    if (this.categoriesForCurrentBudget.find(cat => cat.name === categoryName.name)) {
      return;
    }

    this.store.dispatch(this.actionsCreatorService
      .addCategory(categoryName.name, this.budgetId));
  }
}
