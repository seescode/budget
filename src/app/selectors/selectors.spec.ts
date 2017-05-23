/* tslint:disable */
import { getBudgetingPageRoute, everyCategoryTotalSelector, 
  totalBudgetInfoSelector, monthlyBudgetInfoSelector } from './selectors';

describe('getBudgetingPageRoute', () => {

  it('should return null for / page', () => {
    const actual = getBudgetingPageRoute.resultFunc({
      "path": "/"
    });

    expect(actual).toEqual(null);
  });

  it('should return null for /budget-list page', () => {
    const actual = getBudgetingPageRoute.resultFunc({
      "path": "/budget-list"
    });

    expect(actual).toEqual(null);
  });

  it('should return budgetId, year, and month correctly', () => {
    const actual = getBudgetingPageRoute.resultFunc({
      "path": "/budgeting/bf560523-702b-a61b-7499-08c2ae943689/2017/5"
    });

    expect(actual.budgetId).toEqual('bf560523-702b-a61b-7499-08c2ae943689');
    expect(actual.year).toEqual(2017);
    expect(actual.month).toEqual(5);    
  });
});
