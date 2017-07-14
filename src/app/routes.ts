import { BudgetListPageComponent } from './pages/budget-list-page/budget-list-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'budget-list',
    component: BudgetListPageComponent
  },
  { path: '**', redirectTo: 'budget-list', pathMatch: 'full' }
];
