// import { getSelectedBudgetName, 
//   categoryTransactionsSelector, categoriesForCurrentBudget } from '../selectors';

// import * as moment from 'moment';

// import {
//   calculatedBudgetAmountSelector
// } from '../selectors';

// describe('budgetPageRouteSelector', () => {

//   it('should return null for / page', () => {
//     const actual = budgetPageRouteSelector.resultFunc({
//       'path': '/'
//     });

//     expect(actual).toEqual(null);
//   });

//   it('should return null for /budget-list page', () => {
//     const actual = budgetPageRouteSelector.resultFunc({
//       'path': '/budget-list'
//     });

//     expect(actual).toEqual(null);
//   });

//   it('should return budgetId, year, and month correctly', () => {
//     const actual = budgetPageRouteSelector.resultFunc({
//       'path': '/budgeting/bf560523-702b-a61b-7499-08c2ae943689/2017/5'
//     });

//     expect(actual.budgetId).toEqual('bf560523-702b-a61b-7499-08c2ae943689');
//     expect(actual.year).toEqual(2017);
//     expect(actual.month).toEqual(5);
//     expect(actual.categoryId).toEqual('');
//   });

//   it('should return budgetId, year, and month correctly', () => {
//     const actual = budgetPageRouteSelector.resultFunc({
//       'path': '/budgeting/bf560523-702b-a61b-7499-08c2ae943689/2017/5;category=639fd599-3f81-5a1c-226c-599f085dc4dd'
//     });

//     expect(actual.budgetId).toEqual('bf560523-702b-a61b-7499-08c2ae943689');
//     expect(actual.year).toEqual(2017);
//     expect(actual.month).toEqual(5);
//     expect(actual.categoryId).toEqual('639fd599-3f81-5a1c-226c-599f085dc4dd');
//   });
  
// });


// describe('getSelectedBudgetName', () => {

//   it('should return null when budget is null', () => {
//     const actual = getSelectedBudgetName.resultFunc(null);

//     expect(actual).toEqual(null);
//   });

//   it('should return name when budget isnt null', () => {
//     const actual = getSelectedBudgetName.resultFunc(
//       { name: 'abc', id: '', details: '', budgetAmount: 0, startDate: null, endDate: null });

//     expect(actual).toEqual('abc');
//   });
// });

