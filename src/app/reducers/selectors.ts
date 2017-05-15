import { Transaction } from './../models/interfaces';
import { AppState } from './index';
import { createSelector } from 'reselect';

export const budgetSelector = (state: AppState) => state.budget
export const categorySelector = (state: AppState) => state.category;
export const routerSelector = (state: AppState) => state.router;
export const transactionSelector = (state: AppState) => state.transaction;


//We are assuming the route contains
//  -budgetId
//  -year
//  -month
export const getTransactionListPageRoute = createSelector(routerSelector,
  (routeInfo) => {
    const routes = routeInfo.path.split('/');
    return {
      budgetId: routes[0],
      year: parseInt(routes[1]),
      month: parseInt(routes[2])
    }
  });


export const transactionCurrentMonthSelector = createSelector(transactionSelector,
  getTransactionListPageRoute,
    (transaction, route) => {
    


    return transaction.filter((t: Transaction) => 
      t.timestamp.getMonth() === route.month && 
      t.timestamp.getFullYear() === route.year);
  });

