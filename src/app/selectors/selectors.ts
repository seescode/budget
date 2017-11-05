import { Transaction, Budget, TotalBudgetInfo, UserSelection, Category, Subcategory } from './../models/interfaces';
import { AppState } from '../reducers/index';


import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as moment from 'moment';

export const budgetSelector = (state: AppState) => state.budget;
export const transactionSelector = (state: AppState) => state.transaction;
export const categorySelector = (state: AppState) => state.category;
export const subcategorySelector = (state: AppState) => state.subcategory;
export const routerSelector = (state: AppState) => state.routerReducer;

export const getCurrentMonth = () => {
  return moment([new Date().getFullYear(), new Date().getMonth()]);
};


export const selectionSelector = createSelector(routerSelector, (route) => {
  if (route == null) {
    return null;
  }

  const segments = route.state.url.split('/');

  if (segments[1] === 'budgeting' || segments[1] === 'transactions') {
    return {
      budgetId: segments[2],
      year: parseInt(segments[3], 10),
      month: parseInt(segments[4], 10),
      categoryId: segments[5]
    };
  }

  return null;
});


export const currentAnimationStateSelector = createSelector(routerSelector, (route) => {
  if (route == null) {
    return null;
  }

  const segments = route.state.url.split('/');

  if (
    segments[1] === 'budget-list' ||
    segments[1] === 'add-budget' ||
    segments[1] === 'transactions') {
    return segments[1];
  } else if (segments[1] === 'budgeting') {
    if (segments.length === 5) {
      return 'budgeting';
    } else if (segments.length === 6) {
      return 'add-transaction';
    }
  }

  return null;
});

export const categoriesForCurrentBudget = createSelector(selectionSelector, categorySelector,
  transactionSelector, (userSelection, categories, transactions) => {

    if (userSelection === null || userSelection.budgetId == null || transactions == null) {
      return null;
    }

    return categories
      .map(cat => ({
        icon: cat.icon,
        name: cat.name,
        amount: transactions
          .filter(t => t.budgetId === userSelection.budgetId &&
            t.categoryName === cat.name.toLowerCase() &&
            t.timestamp.getFullYear() === userSelection.year &&
            t.timestamp.getMonth() === userSelection.month - 1)
          .reduce((prev, next) => { return prev + next.amount; }, 0)
      }));
  });


// export const categoriesWithTransactions = createSelector(selectionSelector, categoriesForCurrentBudget,
//   transactionSelector, (userSelection, categories, transactions) => {

//     if (userSelection === null || userSelection.budgetId == null) {
//       return null;
//     }

//     return categories
//       .map(cat => ({
//         ...cat,
//         transactions: transactions
//           .filter(t => t.categoryId === cat.id &&
//             t.timestamp.getFullYear() === userSelection.year &&
//             t.timestamp.getMonth() === userSelection.month - 1)
//           .sort((a, b) => {
//             if (a.timestamp < b.timestamp) {
//               return -1;
//             } else if (a.timestamp > b.timestamp) {
//               return 1;
//             }

//             return 0;
//           })
//       }));
//   });

// export const everyCategoryTotalSelector = createSelector(categoriesWithTransactions,
//   selectionSelector, (categoriesWithTrans, userSelection) => {

//     if (userSelection === null || userSelection.budgetId == null || categoriesWithTrans === null) {
//       return [];
//     }

//     return categoriesWithTrans
//       .map(cat => ({
//         ...cat,
//         amount: cat.transactions
//           .reduce((prev, next) => {
//             return prev + next.amount;
//           }, 0),
//         transactions: cat.id === userSelection.categoryId ? cat.transactions : [],
//         selected: cat.id === userSelection.categoryId
//       }));
//   });

export const getSelectedBudget = createSelector(selectionSelector,
  budgetSelector, (userSelection, budgets) => {

    if (userSelection === null || userSelection.budgetId === null || budgets === null || budgets.length === null) {
      return null;
    }

    return budgets.find(budget => budget.id === userSelection.budgetId);
  });

export const getSelectedBudgetName = createSelector(getSelectedBudget,
  (budget: Budget) => {

    if (budget == null) {
      return null;
    }

    return budget.name;
  });

export const getSelectedDate = createSelector(selectionSelector,
  (selection: UserSelection) => {
    if (selection == null) {
      return null;
    }

    const month = String(selection.month);

    return moment(month, 'M').format('MMMM') + ' ' + selection.year;
  });


// export const totalBudgetInfoSelector = createSelector(selectionSelector,
//   getSelectedBudget, transactionSelector, (userSelection, selectedBudget, transactions): TotalBudgetInfo => {

//     if (userSelection === null || userSelection.budgetId == null || selectedBudget == null) {
//       return null;
//     }

//     const totalBudget = selectedBudget.budgetAmount;
//     const spent = transactions
//       .filter(t => t.budgetId === userSelection.budgetId)
//       .reduce((prev, next) => {
//         return prev + next.amount;
//       }, 0);

//     let unspent = totalBudget - spent;
//     if (unspent < 0) { unspent = 0; };

//     return {
//       totalBudget: totalBudget,
//       unspent: unspent,
//       spent: spent
//     };
//   });

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
export const calculatedBudgetAmountSelector = createSelector(selectionSelector,
  getSelectedBudget, getCurrentMonth, (userSelection, selectedBudget, currentMonth) => {

    if (userSelection === null || userSelection.budgetId == null || selectedBudget == null) {
      return null;
    }

    const startMonth = moment([selectedBudget.startDate.getFullYear(), selectedBudget.startDate.getMonth()]);
    const endMonth = moment([selectedBudget.endDate.getFullYear(), selectedBudget.endDate.getMonth()]);

    // Say you have a budget of 1400 and a total of 14 months.  The result would be a monthlyBudgetAmount of 100
    const monthlyBudgetAmount = selectedBudget.budgetAmount / (endMonth.diff(startMonth, 'months') + 1);

    // Say the budget started on January 2017 and this month is February 2017.  The result of
    // totalNumberOfMonthsSinceStartDate would be 2 months.
    const totalNumberOfMonthsSinceStartDate = currentMonth.diff(startMonth, 'months') + 1;

    const rollingBudgetAmount = calculateRollingBudget(monthlyBudgetAmount, selectedBudget.budgetAmount,
      totalNumberOfMonthsSinceStartDate);

    return {
      rollingBudgetAmount: rollingBudgetAmount,
      monthlyBudgetAmount: monthlyBudgetAmount,
      budgetId: userSelection.budgetId
    };
  });

// export const monthlyBudgetInfoSelector = createSelector(selectionSelector,
//   getSelectedBudget, transactionSelector, calculatedBudgetAmountSelector, (userSelection, selectedBudget, transactions, budgetAmountInfo) => {

//     if (userSelection === null || userSelection.budgetId == null || selectedBudget == null) {
//       return null;
//     }

//     const totalBudget = selectedBudget.budgetAmount;

//     const spent = transactions
//       .filter(t => t.budgetId === userSelection.budgetId &&
//         t.timestamp.getMonth() === userSelection.month - 1 &&
//         t.timestamp.getFullYear() === userSelection.year)
//       .reduce((prev, next) => {
//         return prev + next.amount;
//       }, 0);

//     let unspent = budgetAmountInfo.monthlyBudgetAmount - spent;
//     if (unspent < 0) { unspent = 0; };

//     return {
//       unspent: unspent,
//       spent: spent
//     };
//   });

// export const runningSurplusSelector = createSelector(calculatedBudgetAmountSelector,
//   transactionSelector, (calculatedBudgetAmount, transactions): number => {

//     if (calculatedBudgetAmount === null) {
//       return null;
//     }

//     const spent = transactions
//       .filter(t => t.budgetId === calculatedBudgetAmount.budgetId)
//       .reduce((prev, next) => {
//         return prev + next.amount;
//       }, 0);

//     let surplus = calculatedBudgetAmount.rollingBudgetAmount - spent;

//     if (surplus < 0) {
//       surplus = 0;
//     }

//     return surplus;
//   });

// export const monthlyBudgetPieDataSelector = createSelector(monthlyBudgetInfoSelector,
//   runningSurplusSelector, (monthlyBudgetInfo, runningSurplus) => {

//     if (monthlyBudgetInfo == null) {
//       return [
//         { label: 'Spent', amount: 1 },
//         { label: 'Remaining', amount: 1 },
//         { label: 'Surplus', amount: 1 }
//       ];
//     }

//     return [
//       { label: 'Spent', amount: monthlyBudgetInfo.spent },
//       { label: 'Remaining', amount: monthlyBudgetInfo.unspent },
//       { label: 'Surplus', amount: runningSurplus }
//     ];
//   });

// export const totalBudgetPieDataSelector = createSelector(totalBudgetInfoSelector,
//   (totalBudgetInfo) => {
//     if (totalBudgetInfo == null) {
//       return [
//         { label: 'Spent', amount: 0 },
//         { label: 'Remaining', amount: 10 }
//       ];
//     }

//     return [
//       { label: 'Spent', amount: totalBudgetInfo.spent },
//       { label: 'Remaining', amount: totalBudgetInfo.unspent },
//     ];
//   });


export const categoryTransactionsSelector = createSelector(selectionSelector,
  transactionSelector, (selection, transactions) => {

    if (selection == null || transactions == null) {
      return [];
    }

    return transactions.filter(trans => trans.categoryName === selection.categoryId &&
      trans.timestamp.getFullYear() === selection.year &&
      trans.timestamp.getMonth() === selection.month - 1 &&
      trans.budgetId === selection.budgetId
    );
  });



export const subcategoriesForSelectedCategorySelector = createSelector(subcategorySelector,
  selectionSelector, (subcategories: any, selection) => {

    if (subcategories == null || selection == null) {
      return [];
    }

    return subcategories[selection.categoryId];
  });



export const getMonthGraph = createSelector(categoriesForCurrentBudget, calculatedBudgetAmountSelector,
  (categories, calculatedBudgetAmount) => {

    if (categories == null || calculatedBudgetAmount == null) {
      return [
        {
          name: 'Spent',
          value: 0
        },
        {
          name: 'Remaining',
          value: 0
        }
      ];
    }

    const spent = categories.reduce((prev, next) => { return prev + next.amount; }, 0);
    let remaining = calculatedBudgetAmount.monthlyBudgetAmount - spent;

    if (remaining < 0) {
      remaining = 0;
    }

    return [
      {
        name: 'Spent: $' + spent,
        value: spent
      },
      {
        name: 'Remaining: $' + remaining,
        value: remaining
      }
    ]
  });


export const getTotalGraph = createSelector(selectionSelector, getSelectedBudget,
  transactionSelector, (userSelection, selectedBudget, transactions) => {

    if (userSelection === null || userSelection.budgetId == null || transactions == null ||
      selectedBudget == null) {
      return [
        {
          name: 'Spent',
          value: 0
        },
        {
          name: 'Remaining',
          value: 0
        },
        {
          name: 'Surplus',
          value: 0
        }
      ];
    }

    const spent = transactions.reduce((prev, next) => { return prev + next.amount; }, 0);
    let remaining = selectedBudget.budgetAmount - spent;

    if (remaining < 0) {
      remaining = 0;
    }

    return [
      {
        name: 'Spent: $' + spent,
        value: spent
      },
      {
        name: 'Remaining: $' + remaining,
        value: remaining
      },
      {
        name: 'Surplus: $' + 20,
        value: 20
      }
    ]
  });
