import { Transaction, Budget, Category, TotalBudgetInfo } from './../models/interfaces';
import { AppState } from '../reducers/index';
import { createSelector } from 'reselect';
import { RouterState, RouterModule } from '@angular/router';
import * as moment from 'moment';

export const budgetSelector = (state: AppState) => state.budget;
export const categorySelector = (state: AppState) => state.category;
export const routerSelector = (state: AppState) => state.router;
export const transactionSelector = (state: AppState) => state.transaction;

export const getCurrentMonth = () => {
  return moment([new Date().getFullYear(), new Date().getMonth() + 1]);
};

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



/**
 * This determines from the current month how much total budget
 * we have up to this point.  For example let's say we have a yearly
 * budget of $1200 for the year 2017.  It's currently June 2017 so the
 * calculatedBudgetAmountSelector would return $600.  For July 2017 it
 * would return $700.  This amount increases as the current date gets
 * closer to the budget end date.
 * @param {number} monthlyBudgetAmount
 * @param {number} totalbudgetAmount
 * @param {number} totalNumberOfMonthsSinceStartDate
 * @returns
 */
function calculateRollingBudget(monthlyBudgetAmount: number, totalbudgetAmount: number,
  totalNumberOfMonthsSinceStartDate: number) {
    let rollingBudgetAmount = monthlyBudgetAmount * totalNumberOfMonthsSinceStartDate;

    if (rollingBudgetAmount <= 0) {
      rollingBudgetAmount = 0;
    }

    if (rollingBudgetAmount > totalbudgetAmount) {
      rollingBudgetAmount = totalbudgetAmount;
    }

    return rollingBudgetAmount;
}

/**
 * This calculates the rolling budget amount and the monthly budget amount.
 */
export const calculatedBudgetAmountSelector = createSelector(budgetPageRouteSelector,
  budgetSelector, getCurrentMonth, (route, budgets, currentMonth) => {

    if (route === null || route.budgetId == null || budgets.length === 0) {
      return null;
    }

    const currentBudget = budgets.find(b => b.id === route.budgetId);
    const startMonth = moment([currentBudget.startDate.getFullYear(), currentBudget.startDate.getMonth()]);
    const endMonth = moment([currentBudget.endDate.getFullYear(), currentBudget.endDate.getMonth()]);

    // Say you have a budget of 1400 and a total of 14 months.  The result would be a monthlyBudgetAmount of 100
    const monthlyBudgetAmount = currentBudget.budgetAmount / (endMonth.diff(startMonth, 'months') + 1);

    // Say the budget started on January 2017 and this month is February 2017.  The result of
    // totalNumberOfMonthsSinceStartDate would be 2 months.
    const totalNumberOfMonthsSinceStartDate = currentMonth.diff(startMonth, 'months') + 1;

    const rollingBudgetAmount = calculateRollingBudget(monthlyBudgetAmount, currentBudget.budgetAmount,
      totalNumberOfMonthsSinceStartDate);

    return {
      rollingBudgetAmount: rollingBudgetAmount,
      monthlyBudgetAmount: monthlyBudgetAmount,
      budgetId: route.budgetId
    };
  });


export const monthlyBudgetInfoSelector = createSelector(budgetPageRouteSelector,
  budgetSelector, transactionSelector, calculatedBudgetAmountSelector, (route, budgets, transactions, budgetAmountInfo) => {

    if (route === null || route.budgetId == null || budgets.length === 0) {
      return null;
    }

    const totalBudget = budgets.find(b => b.id === route.budgetId).budgetAmount;

    const spent = transactions
      .filter(t => t.budgetId === route.budgetId &&
        t.timestamp.getMonth() === route.month - 1 &&
        t.timestamp.getFullYear() === route.year)
      .reduce((prev, next) => {
        return prev + next.amount;
      }, 0);

    return {
      unspent: budgetAmountInfo.monthlyBudgetAmount - spent,
      spent: spent
    };
  });

export const runningSurplusSelector = createSelector(calculatedBudgetAmountSelector,
  transactionSelector, (calculatedBudgetAmount, transactions): number => {

    if (calculatedBudgetAmount === null) {
      return null;
    }

    const spent = transactions
      .filter(t => t.budgetId === calculatedBudgetAmount.budgetId)
      .reduce((prev, next) => {
        return prev + next.amount;
      }, 0);

    let surplus = calculatedBudgetAmount.rollingBudgetAmount - spent;

    if (surplus < 0) {
      surplus = 0;
    }

    return surplus;
  });

export const monthlyBudgetPieDataSelector = createSelector(monthlyBudgetInfoSelector,
  runningSurplusSelector, (monthlyBudgetInfo, runningSurplus) => {

  if (monthlyBudgetInfo == null) {
    return [];
  }

  return [
    { label: 'Spent', amount: monthlyBudgetInfo.spent},
    { label: 'Remaining', amount: monthlyBudgetInfo.unspent},
    { label: 'Surplus', amount: runningSurplus}
  ];
});

export const totalBudgetPieDataSelector = createSelector(totalBudgetInfoSelector,
  (totalBudgetInfo) => {

  if (totalBudgetInfo == null) {
    return [];
  }

  return [
    { label: 'Spent', amount: totalBudgetInfo.spent},
    { label: 'Remaining', amount: totalBudgetInfo.unspent}
  ];
});
