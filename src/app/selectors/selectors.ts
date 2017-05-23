import { Transaction, Budget, Category, TotalBudgetInfo } from './../models/interfaces';
import { AppState } from '../reducers/index';
import { createSelector } from 'reselect';
import { RouterState, RouterModule } from '@angular/router';

export const budgetSelector = (state: AppState) => state.budget;
export const categorySelector = (state: AppState) => state.category;
export const routerSelector = (state: AppState) => state.router;
export const transactionSelector = (state: AppState) => state.transaction;

// We are assuming the route contains
//  -budgetId
//  -year
//  -month
export const getBudgetingPageRoute = createSelector(routerSelector,
  (routeInfo: any) => {

    const routes = routeInfo.path.split('/');


    if (routes[1] === 'budget-list') {
      return null;
    }


    const val = {
      budgetId: routes[2],
      year: parseInt(routes[3]),
      month: parseInt(routes[4])
    };

    console.log('val', val);

    return val;
  });

export const everyCategoryTotalSelector = createSelector(categorySelector,
  transactionSelector, (categories, transactions) => {

    // TODO: doesn't consider year and month
    return categories.map(cat => ({
      ...cat,
      amount: transactions
        .filter(t => t.categoryId === cat.id)
        .reduce((prev, next) => {
          return prev + next.amount;
        }, 0)
    }));
  });


export const totalBudgetInfoSelector = createSelector(getBudgetingPageRoute,
  transactionSelector, budgetSelector, (route, transactions, budgets): TotalBudgetInfo => {

    if (route === null || route.budgetId == null || budgets.length === 0) {
      return null;
    }

    const totalBudget = budgets.find(b => b.id === route.budgetId).budgetAmount;
    const spent = transactions
        .filter(t => t.budgetId === route.budgetId)
        .reduce((prev, next) => {
          return prev + next.amount;
        }, 0);

    return {
      totalBudget: totalBudget,
      unspent: totalBudget - spent,
      spent: spent
    };
  });

export const monthlyBudgetInfoSelector = createSelector(getBudgetingPageRoute,
  transactionSelector, budgetSelector, (route, transactions, budgets) => {

    if (route === null || route.budgetId == null || budgets.length === 0) {
      return null;
    }

    const totalBudget = budgets.find(b => b.id === route.budgetId).budgetAmount;
    const monthlyBudget = totalBudget / 12;
    const spent = transactions
        .filter(t => t.budgetId === route.budgetId &&
          t.timestamp.getMonth() === route.month - 1 &&
          t.timestamp.getFullYear() === route.year)
        .reduce((prev, next) => {
          return prev + next.amount;
        }, 0);

    // TODO: doesn't consider year and month
    return {
      unspent: monthlyBudget - spent,
      spent: spent
    };
  });

// export const transactionCurrentMonthSelector = createSelector(transactionSelector,
//   getBudgetingPageRoute,
//     (transaction, route) => {

//     return transaction.filter((t: Transaction) =>
//       t.timestamp.getMonth() === route.month &&
//       t.timestamp.getFullYear() === route.year);
//   });

