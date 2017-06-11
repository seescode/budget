import { CreateBudgetPageComponent } from './containers/create-budget-page/create-budget-page.component';
import { BudgetingPageComponent } from './containers/budgeting-page/budgeting-page.component';
import { BudgetListPageComponent } from './containers/budget-list-page/budget-list-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'budget-list',
    component: BudgetListPageComponent
  },
  {
    path: 'budgeting/:budgetId/:year/:month',
    component: BudgetingPageComponent
  },
  {
    path: 'create-budget',
    // canActivate: [ BookExistsGuard ],
    component: CreateBudgetPageComponent
  },
  { path: '**', redirectTo: 'budget-list', pathMatch: 'full' }
];
