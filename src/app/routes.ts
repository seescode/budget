import { TransactionListPageComponent } from './pages/transaction-list-page/transaction-list-page.component';
import { AddBudgetPageComponent } from './pages/add-budget-page/add-budget-page.component';
import { BudgetingPageComponent } from './pages/budgeting-page/budgeting-page.component';
import { BudgetListPageComponent } from './pages/budget-list-page/budget-list-page.component';
import { Routes } from '@angular/router';
import { AddTransactionPageComponent } from './pages/add-transaction-page/add-transaction-page.component';

export const routes: Routes = [
  {
    path: 'budget-list',
    component: BudgetListPageComponent,
    data: { pageState: 'budget-list'}
  },
  {
    path: 'budgeting/:budgetId/:year/:month',
    component: BudgetingPageComponent,
    data: { pageState: 'budgeting'}
  },
  {
    path: 'budgeting/:budgetId/:year/:month/:categoryId',
    component: AddTransactionPageComponent,
    data: { pageState: 'add-transaction'}
  },
  {
    path: 'transactions/:budgetId/:year/:month/:categoryId',
    component: TransactionListPageComponent,
    data: { pageState: 'transactions'}
  },
  {
    path: 'add-budget',
    // canActivate: [ BookExistsGuard ],
    component: AddBudgetPageComponent,
    data: { pageState: 'add-budget'}
  },
  { path: '**', redirectTo: 'budget-list', pathMatch: 'full' }
];
