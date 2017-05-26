import { Transaction, Budget, Category, TotalBudgetInfo } from './../models/interfaces';
import { AppState } from '../reducers/index';
import { createSelector } from 'reselect';
import { RouterState, RouterModule } from '@angular/router';
import * as moment from 'moment';

export const budgetSelector = (state: AppState) => state.budget;
export const categorySelector = (state: AppState) => state.category;
export const routerSelector = (state: AppState) => state.router;
export const transactionSelector = (state: AppState) => state.transaction;

// We are assuming the route contains
//  -budgetId
//  -year
//  -month
export const budgetPageRouteSelector = createSelector(routerSelector,
  (routeInfo: any) => {

    const routes = routeInfo.path.split('/');

    if (routes[1] !== 'budgeting') {
      return null;
    }

    const val = {
      budgetId: routes[2],
      year: parseInt(routes[3]),
      month: parseInt(routes[4])
    };

    return val;
  });

export const everyCategoryTotalSelector = createSelector(budgetPageRouteSelector, categorySelector,
  transactionSelector, (route, categories, transactions) => {

    if (route === null || route.budgetId == null) {
      return null;
    }

    return categories
      .filter(cat => cat.budgetId === route.budgetId)
      .map(cat => ({
        ...cat,
        amount: transactions
          .filter(t => t.categoryId === cat.id &&
            t.timestamp.getFullYear() === route.year &&
            t.timestamp.getMonth() === route.month - 1)
          .reduce((prev, next) => {
            return prev + next.amount;
          }, 0)
      }));
  });


export const totalBudgetInfoSelector = createSelector(budgetPageRouteSelector,
  budgetSelector, transactionSelector, (route, budgets, transactions): TotalBudgetInfo => {

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

export const monthlyBudgetInfoSelector = createSelector(budgetPageRouteSelector,
  budgetSelector, transactionSelector, (route, budgets, transactions) => {

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

    return {
      unspent: monthlyBudget - spent,
      spent: spent
    };
  });


export const getCurrentMonth = () => {
  return moment([new Date().getFullYear(), new Date().getMonth() + 1]);
};

export const calculatedBudgetAmountSelector = createSelector(budgetPageRouteSelector,
  budgetSelector, getCurrentMonth, (route, budgets, currentMonth) => {

    if (route === null || route.budgetId == null || budgets.length === 0) {
      return null;
    }

    const currentBudget = budgets.find(b => b.id === route.budgetId);


    const startMonth = moment([currentBudget.startDate.getFullYear(),
      currentBudget.startDate.getMonth()]);
    const totalNumberOfMonthsSinceStartDate = currentMonth.diff(startMonth, 'months') + 1;

    const totalBudget = currentBudget.budgetAmount;
    let calculatedBudgetAmount = totalBudget / 12 * totalNumberOfMonthsSinceStartDate;


    const endMonth = moment([currentBudget.endDate.getFullYear(),
      currentBudget.endDate.getMonth()]);

    const totalNumberOfMonthsSinceEndDate = currentMonth.diff(endMonth, 'months');
    console.log('totalNumberOfMonthsSinceEndDate', totalNumberOfMonthsSinceEndDate)

    if (calculatedBudgetAmount <= 0 || totalNumberOfMonthsSinceEndDate > 0) {
      calculatedBudgetAmount = 0;
    }

    return {
      calculatedBudgetAmount: calculatedBudgetAmount,
      budgetId: route.budgetId
    };
  });


export const runningSurplusSelector = createSelector(calculatedBudgetAmountSelector,
  transactionSelector, (calculatedBudgetAmount, transactions) => {

    if (calculatedBudgetAmount === null) {
      return null;
    }

    const spent = transactions
      .filter(t => t.budgetId === calculatedBudgetAmount.budgetId &&
        t.timestamp.getMonth() === -1 &&
        t.timestamp.getFullYear() === 1)
      .reduce((prev, next) => {
        return prev + next.amount;
      }, 0);

    const surplus = 0;

    return surplus;
  });
