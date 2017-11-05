import { TransactionListPageComponent } from './pages/transaction-list-page/transaction-list-page.component';
import { AddBudgetPageComponent } from './pages/add-budget-page/add-budget-page.component';
import { BudgetingPageComponent } from './pages/budgeting-page/budgeting-page.component';
import { BudgetListPageComponent } from './pages/budget-list-page/budget-list-page.component';
import { Routes } from '@angular/router';
import { AddTransactionPageComponent } from './pages/add-transaction-page/add-transaction-page.component';

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
    path: 'budgeting/:budgetId/:year/:month/:categoryId',
    component: AddTransactionPageComponent
  },
  {
    path: 'transactions/:budgetId/:year/:month/:categoryId',
    component: TransactionListPageComponent
  },
  {
    path: 'add-budget',
    // canActivate: [ BookExistsGuard ],
    component: AddBudgetPageComponent
  },
  { path: '**', redirectTo: 'budget-list', pathMatch: 'full' }
];
